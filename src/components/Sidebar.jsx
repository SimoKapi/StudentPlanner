import { NavLink } from "react-router"
import profile from "../assets/react.svg"

function Sidebar({isOpen, toggleSidebar}) {
    return (
        <div className={`md:static md:w-1/5 md:min-w-85 h-screen z-20 md:z-0 transition ease-in-out duration-300`}>
            <div className="w-15 h-full md:hidden">
                <button onClick={toggleSidebar} className="w-full flex flex-row justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
            <div className={`min-w-80 w-4/5 flex flex-col fixed md:static top-0 left-0 md:w-1/5 md:min-w-85 h-screen p-0 bg-background-shade z-20 md:z-1 transition ease-in-out duration-300 md:translate-none ${isOpen ? "-translate-x-full" : "shadow-2xl"}`}>
                <div className="flex flex-row bg-accent">
                    <div className="p-5 flex-3/4 flex items-center">
                        <img src={profile} className="mr-3 rounded-full"/>
                        <NavLink to="./profile" end className="text-3xl hover:underline cursor-pointer">John Doe</NavLink>
                    </div>
                    <button onClick={toggleSidebar} className="block md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </div>
                <div className="p-5 nav-buttons flex flex-col">
                    <NavLink to="./dashboard" end className="p-3 outline-primary hover:outline-1 rounded-xl text-xl">Dashboard</NavLink>
                    <NavLink to="./settings" end className="p-3 outline-primary hover:outline-1 rounded-xl text-xl">Settings</NavLink>
                </div>
                <div className="flex flex-row bg-secondary mt-auto">
                    <div className="p-5 flex-3/4 flex items-center">
                        <div>
                            <img src={profile} className="mr-3 rounded-full" />
                        </div>
                        <div>
                            <h1 className="text-3xl">Student Planner</h1>
                            <p>Developed by <a href="https://simokapi.com" target="_blank" className="text-[#006eff] hover:underline">Simon Kapicka</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar