import { useSearchParams } from "react-router"

function checkAccess(access) {
    return access == "ac"
}

function PasswordReset() {
    const [searchParams, setSearchParams] = useSearchParams()
    const accessVerified = checkAccess(searchParams.get("access"))

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
                    <label htmlFor="username">Email</label>
                    <input type="email" id="username" className=""/>
                    <button className="btn bg-primary px-5 py-2 mx-auto block w-1/2">Send</button>
                </form>
            </div>
        </div>
    )
}

export default PasswordReset