
function Navbar() {
    return (
        <header className="navbar">

            <div className="logo">
                <img src="/rcb-logo.png" alt="RCB Logo" />
                <h2>IPL BOOKING</h2>
            </div>

            <nav>
                <ul>
                    <li><a href="#guidelines">Guidelines</a></li>
                    <li><a href="#my-bookings">My Bookings</a></li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#matches">Matches</a></li>
                    <li><a href="#booking">Book Ticket</a></li>
                    <li><a href="#guidelines">Guidelines</a></li>
                </ul>
            </nav>

        </header>
    );
}

export default Navbar;
