export function GenericCmp({ children }) {

    function handleClick(event) {
        event.stopPropagation(); // Prevent clicks inside the content from propagating
    }

    return (
        <>
            <div className="block" onClick={handleClick}>
                {children}
            </div>
        </>
    )
}
