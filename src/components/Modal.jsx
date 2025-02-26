function Modal({ children, className, isOpen, toggleModal }) {
    if (!isOpen) return null

    return (
        <div className={"modal-backdrop " + className}>
            <div className="w-5/8 h-3/5 bg-background rounded-xl border-primary border-1 m-auto mt-30 grid text-text overflow-hidden">
                <div className="header bg-primary h-18">
                    <button className="btn h-full aspect-square hover:bg-shade" onClick={toggleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-10 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal