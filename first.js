const driverBtn = document.getElementById("driverBtn");
const passengerBtn = document.getElementById("passengerBtn");
const driverSection = document.getElementById("driverSection");
const passengerSection = document.getElementById("passengerSection");
const driverForm = document.getElementById("driverForm");
const passengerForm = document.getElementById("passengerForm");
const results = document.getElementById("results");
const driverMessage = document.getElementById("driverMessage");

let rideDatabase = JSON.parse(localStorage.getItem("rideDatabase")) || [];

// Event listeners to show/hide sections
driverBtn.addEventListener("click", () => {
    driverSection.classList.remove("hidden");
    passengerSection.classList.add("hidden");
    results.innerHTML = "";
});

passengerBtn.addEventListener("click", () => {
    passengerSection.classList.remove("hidden");
    driverSection.classList.add("hidden");
    results.innerHTML = "";
});

// Driver form submission
driverForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const source = document.getElementById("d-source").value.trim();
    const destination = document.getElementById("d-destination").value.trim();
    const date = document.getElementById("d-date").value;
    const time = document.getElementById("d-time").value;
    const seats = document.getElementById("d-seats").value;
    const contact = document.getElementById("d-contact").value.trim();

    rideDatabase.push({ source, destination, date, time, seats, contact });
    localStorage.setItem("rideDatabase", JSON.stringify(rideDatabase));

    driverMessage.textContent = "✅ Ride posted successfully! Thank you for helping the community.";
    driverForm.reset();
});

// Passenger form submission (Corrected logic)
// ... (Keep all existing code before the passengerForm event listener) ...

// Passenger form submission
passengerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const source = document.getElementById("p-source").value.trim();
    const destination = document.getElementById("p-destination").value.trim();

    const matches = rideDatabase.filter(
        (ride) =>
            ride.source.toLowerCase() === source.toLowerCase() &&
            ride.destination.toLowerCase() === destination.toLowerCase()
    );

    // Clear previous results
    results.innerHTML = "";

    if (matches.length === 0) {
        results.innerHTML = "<p class='no-results'>😔 No matching rides found. Try a different route.</p>";
    } else {
        const ridesList = document.createElement('div');
        ridesList.innerHTML = "<h3>Matching Rides:</h3>";

        matches.forEach((ride, index) => {
            const isEmail = ride.contact.includes('@');
            const contactLink = isEmail
                ? `mailto:${ride.contact}?subject=Carpool Request`
                : `tel:${ride.contact}`;
            const contactIcon = isEmail
                ? 'fas fa-envelope'
                : 'fas fa-phone';

            const rideCard = document.createElement('div');
            rideCard.className = 'ride-card animated-card'; // Add a new class for animation
            rideCard.style.animationDelay = `${index * 0.1}s`; // Stagger the animation
            rideCard.innerHTML = `
                <p><strong><i class="fas fa-map-marker-alt"></i> From:</strong> ${ride.source}</p>
                <p><strong><i class="fas fa-route"></i> To:</strong> ${ride.destination}</p>
                <p><strong><i class="fas fa-calendar-alt"></i> Date:</strong> ${ride.date}</p>
                <p><strong><i class="fas fa-clock"></i> Time:</strong> ${ride.time}</p>
                <p><strong><i class="fas fa-chair"></i> Seats Available:</strong> ${ride.seats}</p>
                <a href="${contactLink}" class="contact-btn">
                  <i class="${contactIcon}"></i> Contact Driver
                </a>
            `;
            ridesList.appendChild(rideCard);
        });

        results.appendChild(ridesList);
    }
});