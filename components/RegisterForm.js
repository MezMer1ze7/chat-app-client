import { useState, useEffect } from "react"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from "next/router"

const RegisterForm = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if(token) return router.push('/')
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (!username) { setTimeout(() => { setError('') }, 5000 ); return setError("Enter an username")}
        if (!password) { setTimeout(() => { setError('') }, 5000 ); return setError("Enter a password")}
        if (!email) { setTimeout(() => { setError('') }, 5000 ); return setError("Enter an email")}

        const config = {
            header: {
                "Content-type": "application/json"
            }
        }
        
        try {
            const { data } = await axios.post('https://chap-app-api.herokuapp.com/api/register', { email:email.trim(), password, username:username.trim() }, config)
            if (data.error) {setTimeout(() => { setError('') }, 5000); return setError(data.error)};
            // localStorage.setItem("accessToken",data.accessToken)
            router.push('/login')
            console.log(data)
        } catch (err) {
            setError(err.response.data)
            setTimeout(() => {
                setError('')
                
            }, 3000)
        }

    }
    
    return (
        
        <div className="flex items-center justify-center h-full flex-col">
            <h1 className="text-center h-5 text-red-500 font-semibold tracking-widest mb-5">{error&&error}</h1>  
            <form className="bg-[#1FAB89] p-5 rounded drop-shadow-lg" onSubmit={handleSubmit}>
                <h1 className="text-center uppercase font-semibold text-2xl tracking-widest text-[#D7FBE8]">Register</h1>
                <div className="inputContainer">
                    <label htmlFor="username" className="labelText">Username</label>
                    <input type="text" className="inputs" value={username} onChange={e=>setUsername(e.target.value)}/>
                </div>
                <div className="inputContainer">
                    <label htmlFor="email" className="labelText">Use a <span className="text-red-500 font-bold">FAKE</span> email</label>
                    <input type="email" className="inputs" value={email} onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className="inputContainer">
                    <label htmlFor="password" className="labelText">Password</label>
                    <input type="password" className="inputs" value={password} onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div className="inputContainer">
                    <button className="font-bold uppercase border py-2 px-5 rounded text-[#D7FBE8]">Submit</button>
                </div>
                <h1 className="text-center uppercase font-light text-sm tracking-widest text-[#D7FBE8]">Already have an account?<Link href="/login"><a className="px-1 underline font-semibold">Login</a></Link></h1>
            </form>
            </div>
            
    )
}

export default RegisterForm
