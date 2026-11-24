import supabase from "./supabase.js";
import { useEffect, useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import Booking from "./components/Booking";
import Guidelines from "./components/Guidelines";
import Footer from "./components/Footer";

function App() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMatches();
    }, []);

    async function fetchMatches() {
        const { data, error } = await supabase
            .from("matches")
            .select("*")
            .order("id");

        if (error) {
            console.error("Error fetching matches:", error.message);
        } else {
            setMatches(data || []);
        }

        setLoading(false);
    }

    return (
        <div>
            <Navbar />
            <Hero />

            <section id="matches">
                <h1>IPL Match Schedule</h1>

                <div className="match-container">
                    {loading ? (
                        <p>Loading matches...</p>
                    ) : matches.length === 0 ? (
                        <p>No matches available.</p>
                    ) : (
                        matches.map((match) => (
                            <MatchCard
                                key={match.id}
                                matchNumber={match.id}
                                teams={`${match.team1} vs ${match.team2}`}
                                date={match.date}
                                venue={match.venue}
                                general={match.price}
                                premium={match.price}
                                vip={match.price}
                            />
                        ))
                    )}
                </div>
            </section>

            <Booking />
            <Guidelines />
            <Footer />
        </div>
    );
}

export default App;