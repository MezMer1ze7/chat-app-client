import Link from 'next/link'

const NoUser = () => {
    return (
        <div className="h-screen w-full justify-center grid items-center ">
            <div>
                <h1 className="text-2xl font-semibold">You must <span className="font-bold uppercase text-4xl text-[#62D2A2] px-4">login</span> to see this page</h1>
                <Link href="/login">
                        <div className="text-center p-5 m-5 font-semibold border text-2xl bg-[#62D2A2] rounded-sm hover:scale-110 active:scale-90 duration-500 cursor-pointer">
                        <h1 className="text-[#D7FBE8]">Login Page</h1>
                        </div>
                </Link>
                <div className="text-center">
                    <h1 className="font-semibold text-xl">Don't have an account?</h1>
                    <h1 >Go Register</h1>
                    <Link href="/register">
                        <div className="text-center p-5 m-5 font-semibold border text-2xl bg-[#62D2A2] rounded-sm hover:scale-110 active:scale-90 duration-500 cursor-pointer">
                        <h1 className="text-[#D7FBE8]">Register Page</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NoUser
