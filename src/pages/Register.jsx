import './Login.css'
import Authenticator from '../main/authenticator';
import { db, auth } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Jumbotron from "../components/Jumbotron"
import { useNavigate, NavLink } from 'react-router';

function Register() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")

    function registerUser(formdata) {
        if (formdata.get("password") != formdata.get("repeatPassword")) {
            setErrorMessage("Passwords do not match!")
            return
        }
        Authenticator.registerUser(formdata.get("email"), formdata.get("password"), formdata.get("username"), (error) => {
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
            console.log(user)
        })
        return () => unsubscribe()
    })

    const errorDisplay = errorMessage.length > 0 ?
        <Jumbotron className="bg-danger">
            {errorMessage}
        </Jumbotron> : null

    return (
        <div className="flex flex-row overflow-hidden text-text bg-background w-screen min-h-screen pt-20">
            <div className="w-5xl h-full mx-auto p-4">
                <h1 className="text-5xl text-center font-bold mb-20">Welcome! <br/> Register here</h1>
                <form className="w-3/5 mx-auto" action={registerUser}>
                    {/* <label htmlFor="name">Name</label>
                    <input name="name" type="text" id="name" className=""/> */}
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" id="username" className=""/>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" id="email" className=""/>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" id="password" className=""/>
                    <label htmlFor="repeatPassword">Repeat password</label>
                    <input name="repeatPassword" type="password" id="repeatPassword" className=""/>
                    {errorDisplay}
                    <button className="btn bg-primary px-5 py-2 mx-auto block w-1/2">Register</button>
                    <div className="bottom-links w-2/3 mx-auto text-center">
                        Already have an account? <NavLink to="/login" end className="hover:underline text-url">Login here!</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register