// Reusable Toast Notification Function

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
// Smooth Scrolling for Book Buttons

document.querySelectorAll('#matches a[href="#booking"]').forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        const bookingSection = document.getElementById("booking");

        bookingSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        showToast("Redirecting to Ticket Booking! 🏏");

    });

});
// Toast Notification Styling

const toastStyle = document.createElement("style");

toastStyle.textContent = `
    #toast {
        visibility: hidden;
        min-width: 250px;
        background-color: #1b1b1b;
        color: white;
        text-align: center;
        border-radius: 8px;
        padding: 16px 24px;
        position: fixed;
        z-index: 9999;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 5px solid #e31e24;
        font-size: 15px;
        opacity: 0;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    #toast.show {
        visibility: visible;
        opacity: 1;
    }
`;

document.head.appendChild(toastStyle);

// Activity 7: DOM Selectors

const matchSelect = document.getElementById("match");

const standSelect = document.getElementById("stand");

const ticketInput = document.getElementById("tickets");

// Booking Summary Elements

const summaryMatch = document.getElementById("summary-match");

const summaryStand = document.getElementById("summary-stand");

const summaryPrice = document.getElementById("summary-price");

const summaryQuantity = document.getElementById("summary-quantity");

const summaryTotal = document.getElementById("summary-total");

// Select Booking Form using querySelector

const bookingForm = document.querySelector(".booking-form form");

// Activity 7: Calculate Ticket Price

function updateBookingSummary() {

    const match = matchSelect.value;
    const stand = standSelect.value;
    const quantity = Number(ticketInput.value);

    // Ticket Prices for Each Match

    const ticketPrices = {

        "01": {
            General: 1200,
            Premium: 2500,
            VIP: 5000
        },

        "02": {
            General: 1500,
            Premium: 3000,
            VIP: 6000
        },

        "03": {
            General: 1400,
            Premium: 3200,
            VIP: 6500
        },

        "04": {
            General: 1800,
            Premium: 3500,
            VIP: 7000
        }

    };

    // Get Selected Ticket Price

    const price = match && ticketPrices[match]
        ? ticketPrices[match][stand]
        : 0;

    // Calculate Total Amount

    const total = price * (quantity > 0 ? quantity : 0);

    // Update Booking Summary

    summaryMatch.textContent = matchSelect.options[matchSelect.selectedIndex].text;

    summaryStand.textContent = stand;

    summaryPrice.textContent = price;

    summaryQuantity.textContent = quantity;

    summaryTotal.textContent = total;
}

// Activity 7: Change Event Listeners

matchSelect.addEventListener("change", function() {

    updateBookingSummary();

    showToast("Match selection updated!");

});


standSelect.addEventListener("change", function() {

    updateBookingSummary();

    showToast("Stand category updated!");

});


ticketInput.addEventListener("input", function() {

    updateBookingSummary();

    showToast("Ticket quantity updated!");

});
// Initialise Booking Summary when page loads

updateBookingSummary();
