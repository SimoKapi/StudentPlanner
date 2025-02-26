class profileManager {
  username = "John Doe"
}

function Settings() {
    const pm = new profileManager()

    return (
        <div>
            <h1 className="text-5xl font-sans">Settings</h1>
            <div className="m-2 rounded-md p-2 w-1/2">
                <p>Joined: 31.5.2007</p>
                <hr className="mb-5"/>
                <label for="username">Username:</label>
                <input name="username" id="username" type="text" className="bg-background-shade p-2 mt-2 mb-5 w-full rounded-md" placeholder="Set Username" value={pm.username}/>
                <button className="btn bg-primary py-2 px-4">Change password</button>
            </div>
        </div>
    )
}
  
export default Settings