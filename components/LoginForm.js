import {useState, useEffect } from "react"
import {useDispatch } from 'react-redux'
import axios from 'axios'
import Link from 'next/link'
import { loginUser } from '../app/userSlice'
import {useRouter} from 'next/router'

const LoginForm = () => {
    const dispatch = useDispatch()
    const router= useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (token) return router.push('/')
        
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!username) { setTimeout(() => { setError('') }, 5000); return setError("Enter your username") }
        if (!password) {setTimeout(() => { setError('') }, 5000); return setError("Enter a password")}

        const config = {
            header: {
                "Content-type": "application/json"
            }
        }
        
        try {
            const { data } = await axios.post('https://chap-app-api.herokuapp.com/api/login', { username: username.trim(), password }, config)
            if (!data.accessToken) {setTimeout(() => { setError('') }, 5000); return setError("Invalid credentials")};
            localStorage.setItem("accessToken",data.accessToken)
            dispatch(loginUser(data))
            router.push('/')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
                
            }, 3000)
        }
    }

    return (

            <div className="flex items-center justify-center h-full flex-col">
            <h1 className="text-center h-5 text-red-500 font-semibold tracking-widest mb-5">{error&&error}</h1>        
            <form className="bg-[#1FAB89] p-5 rounded drop-shadow-lg" onSubmit={handleSubmit}>
                <h1 className="text-center uppercase font-semibold text-2xl tracking-widest text-[#D7FBE8]">Login</h1>

                <div className="inputContainer">
                    <label htmlFor="username" className="labelText">Email</label>
                    <input type="text" className="inputs" value={username} onChange={e=>setUsername(e.target.value)}/>
                </div>
                <div className="inputContainer">
                    <label htmlFor="password" className="labelText">Password</label>
                    <input type="password" className="inputs" value={password} onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div className="inputContainer">
                    <button className="font-bold uppercase border py-2 px-5 rounded text-[#D7FBE8]">Submit</button>
                </div>
  
                <h1 className="text-center uppercase font-light text-sm tracking-widest text-[#D7FBE8]">Dont have an account?<Link href="/register"><a className="px-1 underline font-semibold">Register</a></Link></h1>

            </form>
            </div>
            
    )
}

export default LoginForm
