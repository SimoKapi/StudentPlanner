function Jumbotron({ children, className }) {
    return (
        <div className={"p-6 bg-primary text-white text-center rounded-lg mb-2 " + className}>
            {children}
        </div>
    )
}

export default Jumbotron