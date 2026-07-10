import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        const result = await handleLogin({ email, password })
        if (result?.user) {
            navigate('/app')
        } else {
            setError("Invalid email or password. Please try again.")
        }
    }

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }


    return (
        <main className="auth-main">
            <div className="auth-card">
                <div className="auth-header">
                    <img src="/logo.png" alt="PrepAI Logo" className="auth-logo" />
                    <h1>Welcome back</h1>
                    <p className="auth-subtitle">Log in to your PrepAI account</p>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
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
                            type="password" id="password" name='password' placeholder='Enter your password' required />
                    </div>
                    {error && <p style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '-0.5rem' }}>{error}</p>}
                    <button className='button primary-button auth-btn' >Log in</button>
                </form>
                <div className="auth-footer">
                    <p>Don't have an account? <Link to={"/register"} >Sign up</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Login