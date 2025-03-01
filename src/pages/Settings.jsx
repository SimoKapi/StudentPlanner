import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import authenticator from "../main/authenticator"
import { useOutletContext } from "react-router"

function Settings() {
    const {user, refreshUser} = useOutletContext()
    const [newUsername, setNewUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (returnUser) => {
            refreshUser(returnUser)
        })
        return () => unsubscribe()
    }, [])

    function changeUsername() {
        authenticator.updateUser({
            displayName: newUsername
        }, (returnUser) => {
            refreshUser(returnUser)
        }, (error) => {
            setErrorMessage(error)
        })
    }

    const errorJumbo = errorMessage.length > 0 ? (
        <Jumbotron className="bg-danger">
            {errorMessage}
        </Jumbotron>
    ) : null

    if (user) return (
        <div>
            <h1 className="text-5xl font-sans">Settings</h1>
            <div className="m-2 rounded-md p-2 w-1/2">
                <p>Joined: {user.metadata.creationTime}</p>
                <hr className="mb-5"/>
                <label htmlFor="username">Username:</label>
                <input name="username" id="username" type="text" className="bg-background-shade p-2 mt-2 mb-5 w-full rounded-md" placeholder="Set Username" defaultValue={user.displayName} onChange={(event) => {
                    setNewUsername(event.target.value)
                }}/>
                {errorJumbo}
                <button className="btn bg-primary py-2 px-4" onClick={changeUsername}>Update username</button>
            </div>
        </div>
    )
    else return null
}
  
export default Settings