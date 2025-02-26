import './Login.css'
import { NavLink } from 'react-router'

function Login() {
    return (
        <div className="flex flex-row overflow-hidden w-screen h-screen pt-20">
            <div className="w-5xl h-full mx-auto p-4">
                <h1 className="text-5xl text-center font-bold mb-20">Login</h1>
                <form className="w-3/5 mx-auto">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" className=""/>
                    <label htmlFor="username">Password</label>
                    <input type="password" id="username" className=""/>
                    <button className="btn bg-primary px-5 py-2 mx-auto block w-1/2">Login</button>
                    <div className="bottom-links w-2/3 mx-auto text-center">
                        Don't have an account? <NavLink to="/register" end className="hover:underline text-url">Register here!</NavLink>
                        <br/>
                        <NavLink to="/password-reset" end className="hover:underline text-url">Forgot password?</NavLink>
                    </div>
                </form>
            </div>
        </div>
      )
}

export default Login