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