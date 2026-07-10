const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

// Keep your Zod schema exactly as it is
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the profile matches."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question"),
        intention: z.string().describe("The intention of interviewer"),
        answer: z.string().describe("How to answer this question")
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question"),
        intention: z.string().describe("The intention of interviewer"),
        answer: z.string().describe("How to answer this question")
    })),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill missing"),
        severity: z.enum([ "low", "medium", "high" ])
    })),
    preparationPlan: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string())
    })),
    title: z.string().describe("The job title"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}`

    // Convert Zod to structural specification using Type/Properties format Gemini natively understands
    const nativeSchema = {
        type: "OBJECT",
        properties: {
            title: { type: "STRING" },
            matchScore: { type: "NUMBER" },
            technicalQuestions: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        question: { type: "STRING" },
                        intention: { type: "STRING" },
                        answer: { type: "STRING" }
                    },
                    required: ["question", "intention", "answer"]
                }
            },
            behavioralQuestions: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        question: { type: "STRING" },
                        intention: { type: "STRING" },
                        answer: { type: "STRING" }
                    },
                    required: ["question", "intention", "answer"]
                }
            },
            skillGaps: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        skill: { type: "STRING" },
                        severity: { type: "STRING", enum: ["low", "medium", "high"] }
                    },
                    required: ["skill", "severity"]
                }
            },
            preparationPlan: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        day: { type: "NUMBER" },
                        focus: { type: "STRING" },
                        tasks: { type: "ARRAY", items: { type: "STRING" } }
                    },
                    required: ["day", "focus", "tasks"]
                }
            }
        },
        required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
    };

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: nativeSchema, // Uses native specification format
        }
    })

    return JSON.parse(response.text)
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", 
        margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" }
    })

    await browser.close()
    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate resume for a candidate with the following details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
    Return valid clean HTML.`

    const response = await ai.models.generateContent({
        // Note: Replaced predicted preview models with stable production variants
        model: "gemini-2.5-flash", 
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    html: { type: "STRING" }
                },
                required: ["html"]
            }
        }
    })

    const jsonContent = JSON.parse(response.text)
    return await generatePdfFromHtml(jsonContent.html)
}

module.exports = { generateInterviewReport, generateResumePdf }
