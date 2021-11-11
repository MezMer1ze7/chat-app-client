import { ChatIcon, LogoutIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { logoutUser } from '../app/userSlice'
import router from 'next/router'

const Navbar = () => {
    const user = useSelector(state => state.user.user)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const dispatch = useDispatch()
    
    const customStyles = {
        content: {
            top: '20%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -20%)',
            width: '400px',
            height: '30%',
            display: 'grid',
            justifyContent: 'center',
            background: '#D7FBE8',
        },
      };

    const handleLogout = () => {
        dispatch(logoutUser())
        localStorage.removeItem('accessToken')
        router.push('/login')
    }

    const logoutModal = () => {
        return (
            <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
                <div className="grid items-center h-full w-full">
                    <h1 className="text-2xl text-[#1FAB89]">Are you sure?</h1>
                    <div className="flex justify-between">
                        <button className="font-bold text-red-500 hover:scale-110 active:scale-90" onClick={handleLogout}>Logout</button>
                        <button className="font-bold text-[#1FAB89] hover:scale-110 active:scale-90" >Cancel</button>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <nav className="bg-[#1FAB89] flex justify-around items-center h-14">
            <div className="flex items-center space-x-2">
                <h1 className="text-[#D7FBE8] text-xl md:text-2xl">ChatApp</h1>
                <ChatIcon className="text-[#D7FBE8] h-6 md:h-10"/>
            </div>
            
            <div className="flex space-x-10 md:space-x-28">

                <div className="navItem_container group">
                    <h1 className="nav_h1 group-hover:opacity-0 capitalize">{user?.username}</h1>

                </div>
            
                <div className="navItem_container group" onClick={() => setModalIsOpen(prev =>!prev)}>

                    {logoutModal()}

                    <h1 className="nav_h1 group-hover:opacity-0">Logout</h1>
                    <LogoutIcon  className="navIcon group-hover:opacity-100"/>

                </div>

                <div className="navItem_container group">
                    <h1 className="nav_h1 group-hover:opacity-0">About</h1>
                    <QuestionMarkCircleIcon className="navIcon group-hover:opacity-100"/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
