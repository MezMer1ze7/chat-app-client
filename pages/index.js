import Chat from "../components/Chat"
import Navbar from "../components/Navbar"
import NoUser from "../components/NoUser"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from '../app/userSlice'




const Home = () => {
  const dispatch = useDispatch()
  const userToken = useSelector(state=>state.user.user?.accessToken)
  const token = localStorage.getItem('accessToken')

  if (!userToken) {
    localStorage.removeItem('accessToken')
    return <NoUser />
  }

  if (!token) {
    dispatch(logoutUser())
    return <NoUser/>
  }

  
  return (
    <div>
      <Navbar />
      <Chat />
    </div>
  )
}


export default Home