import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'

const Chat = () => {
    const user = useSelector(state => state.user.user)
    const [room, setRoom] = useState([])
    const [message, setMessage] = useState("")
    const [activeRoom, setActiveRoom] = useState()
    const [activeRoomName, setActiveRoomName] = useState('')
    const socket = useRef()
    const scrollRef = useRef()


    useEffect(() => {
        socket.current = io('chap-app-api.herokuapp.com')
    },[])

    useEffect(() => {
        const getRooms = async () => {
            const { data } = await axios.get(`https://chap-app-api.herokuapp.com/api/getRooms`)
            setRoom(data)
  
        }

        getRooms()
    }, [activeRoom])

    useEffect(() => {
        socket.current.on("returnMessage", message => {        
            setActiveRoom(prev=>[...prev, message])

        })
    },[])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[activeRoom])
    

    const handleSubmit = async(e) => {
        e.preventDefault()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`
            }
        }

        try {
            const { data } = await axios.post(`https://chap-app-api.herokuapp.com/api/message/${activeRoomName}`, { message }, config)
            socket.current.emit('message', data, activeRoomName)

            setMessage('')
        } catch (error) {
            console.error(error)
        }
    }

  
    const handleClickedRoom = (room) => {
        setActiveRoom(room.chats)
        setActiveRoomName(room.room)
        socket.current.emit("joinRoom", room.room)
    }
 
    return (
        <div className="h-screen p-5 py-20 md:p-24">
            <div className='border border-grey-500 flex  p-5 justify-between font-semibold capitalize'>         
                    {room.map(e => <div key={e._id} className={`text-green-800 p-2 ${activeRoomName === e.room && 'bg-green-400 rounded text-[#ffffff]'}`} onClick={()=>handleClickedRoom(e)}>{e.room}</div>)}
                </div>
            <div className="flex flex-col border h-full justify-between  border-green-500 overflow-scroll scrollbar-hide relative">
                <div className="flex flex-col p-5 space-y-7" >
                    {activeRoom && activeRoom.map(e => <h1 className="" ref={scrollRef} key={e._id}> <span className={user.username === e.sender ? "text-gray-50 font-semibold capitalize border rounded-full p-2 border-green-400 bg-green-500" : "capitalize font-semibold border border-green-400 text-green-700 rounded-full p-2"}>{e.sender}</span> - <span className="text-lg md:text-xl font-semibold text-green-800">{e.message}</span></h1>)}
                    
                    {/* {activeRoom && activeRoom.map(e => <h1 className="">{e.sender} - {e.message}</h1>)} */}
                </div>
                    <form onSubmit={handleSubmit} className="flex ">
                        <input type="text" className="outline-none border flex-grow h-10" value={message} onChange={e=>setMessage(e.target.value)}/>
                        <button className="px-5 bg-green-400 font-bold text-white">send</button>
                    </form>
                </div>
        </div>
    )
}

export default Chat
