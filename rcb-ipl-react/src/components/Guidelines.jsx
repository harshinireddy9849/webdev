
function Guidelines() {
    const rules = [
        "Carry a valid match ticket for entry.",
        "Follow stadium security instructions.",
        "Outside food and beverages are not allowed.",
        "Maintain discipline inside the stadium.",
        "Follow the seating arrangements mentioned on your ticket.",
        "Enjoy the match and support your favourite team!"
    ];

    return (
        <section className="guidelines" id="guidelines">
            <h1>Stadium Guidelines</h1>

            <div className="guidelines-container">
                {rules.map((rule, index) => (
                    <div className="guideline-card" key={index}>
                        <h3>Rule {index + 1}</h3>
                        <p>{rule}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Guidelines;
