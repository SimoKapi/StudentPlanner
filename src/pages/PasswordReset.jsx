import { useSearchParams } from "react-router"
import authenticator from "../main/authenticator"
import Jumbotron from '../components/Jumbotron';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router'

function checkAccess(access) {
    return access == "ac"
}

function PasswordReset() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [errorMessage, setErrorMessage] = useState("")
    const accessVerified = checkAccess(searchParams.get("access"))
    var userEmail = ""

    function setEmail(email) {
        userEmail = email
    }

    function sendResetEmail() {
        authenticator.resetPassword(userEmail, (error) => {
            console.log(error)
            setErrorMessage(error)
        }, () => {
            navigate("/login")
        })
    }

    const errorDisplay = errorMessage.length > 0 ?
    <Jumbotron className="bg-danger">
        {errorMessage}
    </Jumbotron> : null

    if (accessVerified) return (
        <div className="flex flex-row overflow-hidden w-screen h-screen pt-20">
            <div className="w-5xl h-full mx-auto p-4">
                <h1 className="text-5xl text-center font-bold mb-20">Reset password</h1>
                <form className="w-3/5 mx-auto">
                    <label htmlFor="password">New password</label>
                    <input type="password" id="password" className=""/>
                    <label htmlFor="repeatPassword">Repeat password</label>
                    <input type="password" id="repeatPassword" className=""/>
                    <button className="btn bg-primary px-5 py-2 mx-auto block w-1/2">Reset</button>
                </form>
            </div>
        </div>
    )

    else return (
        <div className="flex flex-row overflow-hidden w-screen h-screen pt-20">
            <div className="w-5xl h-full mx-auto p-4">
                <h1 className="text-5xl text-center font-bold mb-20">Reset password</h1>
                <form className="w-3/5 mx-auto">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="" onChange={(event) => {
                        setEmail(event.target.value)
                    }}/>
                    {errorDisplay}
                    <button className="btn bg-primary px-5 py-2 mx-auto block w-1/2" onClick={sendResetEmail}>Send</button>
                    <div className="bottom-links w-2/3 mx-auto text-center">
                        <NavLink to="/login" end className="hover:underline text-url">Back to login</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordReset