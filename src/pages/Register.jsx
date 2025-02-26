import './Login.css'

function Register() {
    return (
        <div className="flex flex-row overflow-hidden text-text bg-background w-screen h-screen pt-20">
            <div className="w-5xl h-full mx-auto p-4">
                <h1 className="text-5xl text-center font-bold mb-20">Welcome! <br/> Register here</h1>
                <form className="w-3/5 mx-auto">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className=""/>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" className=""/>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className=""/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className=""/>
                    <label htmlFor="repeatPassword">Repeat password</label>
                    <input type="password" id="repeatPassword" className=""/>
                    <button className="btn bg-primary px-5 py-2 mx-auto block w-1/2">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register