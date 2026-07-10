const { GoogleGenAI } = require('@google/genai');

// Initialize the client. If you leave this empty, 
// it automatically looks for the GEMINI_API_KEY environment variable.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function runTest() {
    try {
        console.log("Sending request to Gemini...");
        
        // Using the recommended multimodal flash model
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: 'Write a haiku poem about coding in JavaScript.',
        });

        console.log("\n--- Success! Response received: ---");
        console.log(response.text);
        
    } catch (error) {
        console.error("\n--- Error testing Gemini API ---");
        console.error(error.message);
    }
}

runTest();