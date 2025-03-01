import { useEffect, useState } from "react"
import Jumbotron from "../components/Jumbotron"
import { auth, db } from "../firebase"
import authenticator from "../main/authenticator"
import { getAuth, onAuthStateChanged } from "firebase/auth"

function Profile() {
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            authenticator.fetchFriends((docs) => {
                setFriends(docs)
                console.log(docs)
            })
        })
        return () => unsubscribe()
    }, [])

    const friendElements = friends.map((friend) => {
        return (<tr key={friend['userId']}>
            <td className="py-2 px-6 text-left">{friend['username']}</td>
            <td className="py-2 px-6 text-right">{friend['score']}</td>
        </tr>)
    })

    return (
        <div className="">
            <Jumbotron className="mx-50">
                <h1 className="text-4xl font-bold">John Doe</h1>
            </Jumbotron>
            <div className="bg-background-shade mx-20 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-danger">
                        <tr>
                            <th className="py-4 px-6 text-left">Friends</th>
                            <th className="py-4 px-6 text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody className="bg-background-shade">
                        {friendElements}
                    </tbody>
                </table>
                <div className="w-1/2 mx-auto mt-20">
                    <label htmlFor="addFriend">Add friend</label>
                    <input type="text" id="addFriend"></input>
                </div>
            </div>
        </div>
    )
}

export default Profile