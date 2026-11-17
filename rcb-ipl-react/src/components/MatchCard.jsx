
function MatchCard(props) {

    return (
        <div className="match-card">

            <h3>Match {props.matchNumber}</h3>

            <h2>{props.teams}</h2>

            <p>Date: {props.date}</p>

            <p>Venue: {props.venue}</p>

            <p>General: ₹{props.general}</p>

            <p>Premium: ₹{props.premium}</p>

            <p>VIP: ₹{props.vip}</p>

            <a href="#booking" className="match-book-button">
    Book Ticket
</a>

        </div>
    );
}

export default MatchCard;
