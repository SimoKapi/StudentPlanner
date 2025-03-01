import './Login.css'
import { NavLink, useNavigate } from 'react-router'
import Authenticator from '../main/authenticator';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';

function Login() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")

    function signInUser(formdata) {
        Authenticator.signIn(formdata.get("email"), formdata.get("password"), (error) => {
            console.error(error)
            setErrorMessage(error)
        }, (success) => {
            setErrorMessage("")
            navigate("../app")
        })
    }

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) navigate("../app")
        })
        return () => unsubscribe()
    })

    const errorDisplay = errorMessage.length > 0 ?
    <Jumbotron className="bg-danger">
        {errorMessage}
    </Jumbotron> : null

    return (
        <div className="flex flex-row overflow-hidden w-screen min-h-screen pt-20">
            <div className="w-5xl h-full mx-auto p-4">
                <h1 className="text-5xl text-center font-bold mb-20">Login</h1>
                <form className="w-3/5 mx-auto" action={signInUser}>
                    <label htmlFor="username">Email</label>
                    <input name="email" type="text" id="username" className=""/>
                    <label htmlFor="username">Password</label>
                    <input name="password" type="password" id="username" className=""/>
                    {errorDisplay}
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