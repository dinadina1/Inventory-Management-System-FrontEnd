
const Footer = () => {

    // state for year
    const year = new Date().getFullYear();

    return (
        <>
            <div className="bg-dark text-white">
                <p className="text-center p-4 m-0">&#169; {year}, dinad9355@gmail.com.  All Rights Reserved.</p>
            </div>
        </>
    )
}

export default Footer