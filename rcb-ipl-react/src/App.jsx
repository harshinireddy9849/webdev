import Footer from "./components/Footer";
import Guidelines from "./components/Guidelines";
import Booking from "./components/Booking";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";

function App() {

    // Match Data

    const matches = [

        {
            id: 1,
            matchNumber: "01",
            teams: "CSK vs MI",
            date: "10 April 7:30 PM",
            venue: "Chennai",
            general: 1200,
            premium: 2500,
            vip: 5000
        },

        {
            id: 2,
            matchNumber: "02",
            teams: "RCB vs MI",
            date: "14 April 7:30 PM",
            venue: "Bengaluru",
            general: 1500,
            premium: 3000,
            vip: 6000
        },

        {
            id: 3,
            matchNumber: "03",
            teams: "DC vs CSK",
            date: "18 April 7:30 PM",
            venue: "Delhi",
            general: 1400,
            premium: 3200,
            vip: 6500
        },

        {
            id: 4,
            matchNumber: "04",
            teams: "RR vs RCB",
            date: "22 April 7:30 PM",
            venue: "Hyderabad",
            general: 1800,
            premium: 3500,
            vip: 7000
        }

    ];

    return (

        <div>

            {/* Navigation Component */}

            <Navbar />

            {/* Hero Component */}

            <Hero />

            {/* Match Schedule */}

            <section id="matches">

                <h1>IPL Match Schedule</h1>

                <div className="match-container">

                    {matches.map((match) => (

                        <MatchCard
                            key={match.id}
                            matchNumber={match.matchNumber}
                            teams={match.teams}
                            date={match.date}
                            venue={match.venue}
                            general={match.general}
                            premium={match.premium}
                            vip={match.vip}
                        />

                    ))}

                </div>

            </section>

          <Booking />
          <Guidelines />
          <Footer />

        </div>

    );
}

export default App;
