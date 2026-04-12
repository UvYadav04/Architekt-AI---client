import { useState } from "react"
import { LogOut, Menu, X, Loader2 } from "lucide-react"
import { useLoginMutation, useLogoutMutation } from "../../../redux/services/userApiSlice"
import useUserInfo from "../../../hooks/useUserInfo"
import { toast } from "sonner"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"

export default function Navbar() {
    const { userInfo } = useUserInfo()
    const [open, setOpen] = useState(false)
    // console.log(userInfo)

    const [login, { isLoading: loggingIn }] = useLoginMutation()
    const [logout, { isLoading: loggingOut }] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            const { success, message } = await logout().unwrap()
            if (!success)
                throw new Error(message)
        } catch (error: any) {
            toast.info(error?.message || error?.data?.message || "Failed to Log out at the moment")
        }
    }
    const handleLogin = async (name: string, email: string) => {
        try {
            const { success, message } = await login({ name, email }).unwrap()
            if (!success)
                throw new Error(message)
        } catch (error: any) {
            toast.info(error?.message || error?.data?.message || "Failed to Log in at the moment")
        }
    }

    return (
        <>
            {/* HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 bg-transparent ">
                <div className="max-w-7xl mx-auto px-4 py-3 flex place-items-center place-content-between">

                    {/* LOGO */}
                    <div className="text-xl font-bold text-white cursor-pointer">
                        Architekt AI
                    </div>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-6 text-white">
                        <a href="/about" className="hover:opacity-70">About</a>
                        <a href="https://github.com" target="_blank" className="hover:opacity-70">GitHub</a>
                        <a href="https://linkedin.com" target="_blank" className="hover:opacity-70">LinkedIn</a>

                        {userInfo ? (
                            <span className="ml-4 relative group text-black border-white bg-white px-4 py-1 rounded-md flex items-center">
                                {userInfo.name}
                                {loggingOut ? (
                                    <Loader2 className="ml-2 animate-spin text-red-500 w-5 h-5" />
                                ) : (
                                    <LogOut
                                        onClick={handleLogout}
                                        className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-opacity  duration-150 text-red-500 cursor-pointer  group-hover:block hidden"
                                    />
                                )}
                            </span>
                        ) : (
                            <button className="text-black rounded-md" disabled={loggingIn}>
                                <div className="flex items-center gap-2">
                                    {loggingIn ? (
                                        <Loader2 className="animate-spin text-black w-6 h-6" />
                                    ) : (
                                        <GoogleLogin
                                            onSuccess={async (credentialResponse) => {
                                                const decoded: any = jwtDecode(credentialResponse.credential || "")
                                                handleLogin(decoded.name, decoded.email)
                                            }}
                                            onError={() => {
                                                toast.error("Can't log in at the moment")
                                            }}
                                            theme="filled_black"
                                            shape="pill"
                                            size="medium"
                                        />
                                    )}
                                </div>
                            </button>
                        )}
                    </nav>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* MOBILE DRAWER */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-black/90 backdrop-blur-lg z-50 transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-4 border-b border-white/20">
                    <span className="text-white font-bold">Menu</span>
                    <button onClick={() => setOpen(false)}>
                        <X className="text-white" />
                    </button>
                </div>

                <div className="flex flex-col justify-between h-[calc(100%-60px)]">

                    {/* TOP LINKS */}
                    <div className="flex flex-col gap-4 p-4 text-white">
                        <a href="/designs" className="hover:opacity-70">My Designs</a>
                        <a href="/about" className="hover:opacity-70">About</a>
                        <a href="https://github.com" target="_blank" className="hover:opacity-70">GitHub</a>
                        <a href="https://linkedin.com" target="_blank" className="hover:opacity-70">LinkedIn</a>
                    </div>

                    {/* BOTTOM AUTH */}
                    <div className="p-4 border-t border-white/20 text-white">
                        {userInfo ? (
                            <div className="text-sm flex items-center">
                                Signed in as <b className="ml-1">{userInfo.name}</b>
                                {loggingOut && (
                                    <Loader2 className="ml-2 animate-spin text-red-500 w-4 h-4" />
                                )}
                            </div>
                        ) : (
                            <button className="w-full bg-white text-black py-2 rounded-md flex items-center justify-center" disabled={loggingIn}>
                                {loggingIn ? (
                                    <>
                                        <Loader2 className="animate-spin w-5 h-5 mr-2" /> Signing in...
                                    </>
                                ) : (
                                    <>Continue with Google</>
                                )}
                            </button>
                        )}
                    </div>

                </div>
            </div>

            {/* BACKDROP */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    )
}