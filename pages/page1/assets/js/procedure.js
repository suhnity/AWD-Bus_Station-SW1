document.addEventListener("DOMContentLoaded", function() {
    const departure = localStorage.getItem("departure");
    const destination = localStorage.getItem("destination");
    const passengerCount = parseInt(localStorage.getItem("passengerCount"), 10) || 1;

    const prices = {
        "Cubao-Baguio": 637.00, "Cubao-Alaminos": 561.00, "Cubao-Dagupan": 526.00, "Cubao-Bolinao": 645.00, "Cubao-Zambales": 488.00,
        "Sampaloc-Baguio": 629.00, "Sampaloc-Alaminos": 553.00, "Sampaloc-Dagupan": 518.00, "Sampaloc-Bolinao": 637.00, "Sampaloc-Zambales": 480.00,
        "Pasay-Baguio": 641.00, "Pasay-Alaminos": 565.00, "Pasay-Dagupan": 530.00, "Pasay-Bolinao": 649.00, "Pasay-Zambales": 492.00,
        "Caloocan-Baguio": 629.00, "Caloocan-Alaminos": 553.00, "Caloocan-Dagupan": 518.00, "Caloocan-Bolinao": 637.00, "Caloocan-Zambales": 480.00,
        "PITX-Baguio": 646.00, "PITX-Alaminos": 569.00, "PITX-Dagupan": 534.00, "PITX-Bolinao": 653.00, "PITX-Zambales": 456.00
    };

    const routeKey = `${departure}-${destination}`;
    const basePrice = prices[routeKey] || 0;
    const totalPrice = basePrice * passengerCount;

    const priceElements = document.querySelectorAll(".fare .price");

    priceElements.forEach(priceElement => {
        priceElement.textContent = `₱${totalPrice.toFixed(2)}`;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const seatsBus1 = document.querySelector(".seats.bus1");
    const seatsBus2 = document.querySelector(".seats.bus2");
    const seatsBus3 = document.querySelector(".seats.bus3");

    function updateAvailableSeats() {
        const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
        const bus1AvailableSeats = 20 - selectedSeats.filter(seat => seat.bus === "bus1").length;
        const bus2AvailableSeats = 20 - selectedSeats.filter(seat => seat.bus === "bus2").length;
        const bus3AvailableSeats = 20 - selectedSeats.filter(seat => seat.bus === "bus3").length;

        seatsBus1.textContent = bus1AvailableSeats;
        seatsBus2.textContent = bus2AvailableSeats;
        seatsBus3.textContent = bus3AvailableSeats;
    }

    updateAvailableSeats();
});