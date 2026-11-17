
import { useState } from "react";

function Booking() {
    const [match, setMatch] = useState("");
    const [stand, setStand] = useState("");
    const [tickets, setTickets] = useState(1);
    const [bookings, setBookings] = useState([]);

    const prices = {
        "CSK vs MI": { General: 1200, Premium: 2500, VIP: 5000 },
        "RCB vs MI": { General: 1500, Premium: 3000, VIP: 6000 },
        "DC vs CSK": { General: 1400, Premium: 3200, VIP: 6500 },
        "RR vs RCB": { General: 1800, Premium: 3500, VIP: 7000 }
    };

    const price = match && stand ? prices[match][stand] : 0;
    const total = price * Number(tickets);

    function handleBooking(event) {
        event.preventDefault();

        const newBooking = {
            id: Date.now(),
            match,
            stand,
            tickets,
            total
        };

        setBookings((previousBookings) => [
            ...previousBookings,
            newBooking
        ]);

        alert("Booking Successful!");

        setMatch("");
        setStand("");
        setTickets(1);
    }

    return (
        <section className="booking" id="booking">

            <h1>Book Your IPL Tickets</h1>

            <form onSubmit={handleBooking}>

                <label>Select Match</label>

                <select
                    value={match}
                    onChange={(event) => setMatch(event.target.value)}
                    required
                >
                    <option value="">Choose a match</option>
                    <option value="CSK vs MI">CSK vs MI</option>
                    <option value="RCB vs MI">RCB vs MI</option>
                    <option value="DC vs CSK">DC vs CSK</option>
                    <option value="RR vs RCB">RR vs RCB</option>
                </select>

                <label>Select Stand</label>

                <select
                    value={stand}
                    onChange={(event) => setStand(event.target.value)}
                    required
                >
                    <option value="">Choose a stand</option>
                    <option value="General">General</option>
                    <option value="Premium">Premium</option>
                    <option value="VIP">VIP</option>
                </select>

                <label>Number of Tickets</label>

                <input
                    type="number"
                    min="1"
                    max="10"
                    value={tickets}
                    onChange={(event) =>
                        setTickets(event.target.value)
                    }
                    required
                />

                <div className="booking-summary">
                    <h3>Booking Summary</h3>

                    <p>Match: {match || "Not selected"}</p>
                    <p>Stand: {stand || "Not selected"}</p>
                    <p>Price per Ticket: ₹{price}</p>
                    <p>Quantity: {tickets}</p>

                    <h3>
                        Total: ₹{total.toLocaleString("en-IN")}
                    </h3>
                </div>

                <button type="submit">
                    Confirm Booking
                </button>

            </form>

            <div className="my-bookings" id="my-bookings">

                <h2>My Bookings</h2>

                {bookings.length === 0 ? (
                    <p>No bookings yet.</p>
                ) : (
                    bookings.map((booking) => (
                        <div
                            className="booking-item"
                            key={booking.id}
                        >
                            <h3>{booking.match}</h3>
                            <p>Stand: {booking.stand}</p>
                            <p>Tickets: {booking.tickets}</p>
                            <p>
                                Total: ₹
                                {Number(booking.total).toLocaleString("en-IN")}
                            </p>
                        </div>
                    ))
                )}

            </div>

        </section>
    );
}

export default Booking;
