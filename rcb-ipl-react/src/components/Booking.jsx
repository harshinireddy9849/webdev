
import { useEffect, useState } from "react";
import supabase from "../supabase.js";

function Booking() {
    const [matches, setMatches] = useState([]);
    const [matchId, setMatchId] = useState("");
    const [userName, setUserName] = useState("");
    const [tickets, setTickets] = useState(1);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const selectedMatch = matches.find(
        (match) => String(match.id) === matchId
    );

    const price = selectedMatch ? selectedMatch.price : 0;
    const total = price * Number(tickets);

    async function fetchMatches() {
        const { data, error } = await supabase
            .from("matches")
            .select("*")
            .order("id");

        if (error) {
            console.error("Error loading matches:", error.message);
        } else {
            setMatches(data || []);
        }
    }

    async function fetchBookings() {
        const { data, error } = await supabase
            .from("bookings")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error loading bookings:", error.message);
        } else {
            setBookings(data || []);
        }
    }

    useEffect(() => {
        fetchMatches();
        fetchBookings();

        const channel = supabase
            .channel("booking-updates")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "matches" },
                fetchMatches
            )
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "bookings" },
                fetchBookings
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    async function handleBooking(event) {
        event.preventDefault();

        if (!selectedMatch) {
            alert("Please select a match.");
            return;
        }

        const quantity = Number(tickets);

        if (!userName.trim()) {
            alert("Please enter your name.");
            return;
        }

        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
            alert("Please select between 1 and 10 tickets.");
            return;
        }

        if (quantity > selectedMatch.available_seats) {
            alert("Not enough seats available!");
            return;
        }

        setLoading(true);

        const { data: updatedMatch, error: updateError } = await supabase
            .from("matches")
            .update({
                available_seats: selectedMatch.available_seats - quantity
            })
            .eq("id", selectedMatch.id)
            .gte("available_seats", quantity)
            .select()
            .maybeSingle();

        if (updateError || !updatedMatch) {
            alert("Seats could not be reserved. Please try again.");
            setLoading(false);
            await fetchMatches();
            return;
        }

        const newBooking = {
            match_id: selectedMatch.id,
            user_name: userName.trim(),
            match_title: `${selectedMatch.team1} vs ${selectedMatch.team2}`,
            tickets: quantity,
            total_price: total
        };

        const { error: bookingError } = await supabase
            .from("bookings")
            .insert([newBooking]);

        if (bookingError) {
            console.error("Booking error:", bookingError.message);

            await supabase
                .from("matches")
                .update({
                    available_seats: selectedMatch.available_seats
                })
                .eq("id", selectedMatch.id);

            alert("Booking failed: " + bookingError.message);
        } else {
            alert("Booking Successful! ❤️");

            setUserName("");
            setMatchId("");
            setTickets(1);

            await fetchMatches();
            await fetchBookings();
        }

        setLoading(false);
    }

    async function cancelBooking(booking) {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) return;

        setLoading(true);

        const { data: match, error: fetchError } = await supabase
            .from("matches")
            .select("available_seats")
            .eq("id", booking.match_id)
            .single();

        if (fetchError) {
            alert("Could not find the match.");
            setLoading(false);
            return;
        }

        const { error: deleteError } = await supabase
            .from("bookings")
            .delete()
            .eq("id", booking.id);

        if (deleteError) {
            alert("Could not cancel booking: " + deleteError.message);
            setLoading(false);
            return;
        }

        const { error: updateError } = await supabase
            .from("matches")
            .update({
                available_seats: match.available_seats + booking.tickets
            })
            .eq("id", booking.match_id);

        if (updateError) {
            alert("Booking cancelled, but seats could not be restored.");
        } else {
            alert("Booking cancelled successfully! ❤️");
        }

        await fetchMatches();
        await fetchBookings();

        setLoading(false);
    }

    return (
        <section className="booking" id="booking">
            <h1>Book Your IPL Tickets</h1>

            <form onSubmit={handleBooking}>
                <label>Your Name</label>

                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />

                <label>Select Match</label>

                <select
                    value={matchId}
                    onChange={(e) => setMatchId(e.target.value)}
                    required
                >
                    <option value="">Choose a match</option>

                    {matches.map((match) => (
                        <option key={match.id} value={match.id}>
                            {match.team1} vs {match.team2} - {match.venue}
                        </option>
                    ))}
                </select>

                {selectedMatch && (
                    <p>Available seats: {selectedMatch.available_seats}</p>
                )}

                <label>Number of Tickets</label>

                <input
                    type="number"
                    min="1"
                    max={
                        selectedMatch
                            ? Math.min(10, selectedMatch.available_seats)
                            : 10
                    }
                    value={tickets}
                    onChange={(e) => setTickets(e.target.value)}
                    required
                />

                <div className="booking-summary">
                    <h3>Booking Summary</h3>

                    <p>
                        Match: {selectedMatch
                            ? `${selectedMatch.team1} vs ${selectedMatch.team2}`
                            : "Not selected"}
                    </p>

                    <p>Venue: {selectedMatch?.venue || "Not selected"}</p>
                    <p>Price per Ticket: ₹{price}</p>
                    <p>Quantity: {tickets}</p>

                    <h3>
                        Total: ₹{total.toLocaleString("en-IN")}
                    </h3>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Confirm Booking"}
                </button>
            </form>

            <div className="my-bookings" id="my-bookings">
                <h2>My Bookings</h2>

                {bookings.length === 0 ? (
                    <p>No bookings yet.</p>
                ) : (
                    bookings.map((booking) => (
                        <div className="booking-item" key={booking.id}>
                            <h3>{booking.match_title}</h3>

                            <p>Name: {booking.user_name}</p>
                            <p>Tickets: {booking.tickets}</p>

                            <p>
                                Total: ₹
                                {Number(booking.total_price).toLocaleString("en-IN")}
                            </p>

                            <button
                                type="button"
                                className="cancel-button"
                                disabled={loading}
                                onClick={() => cancelBooking(booking)}
                            >
                                {loading ? "Processing..." : "Cancel Booking"}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default Booking;
