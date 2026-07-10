import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/app")
    }

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }

    return (
        <main className="auth-main">
            <div className="auth-card">
                <div className="auth-header">
                    <img src="/logo.png" alt="PrepAI Logo" className="auth-logo" />
                    <h1>Create an account</h1>
                    <p className="auth-subtitle">Start your interview preparation with PrepAI</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Choose a username' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter your email' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Create a password' required />
                    </div>

                    <button className='button primary-button auth-btn' >Sign up</button>

                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to={"/login"} >Log in</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Register