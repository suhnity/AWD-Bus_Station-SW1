document.addEventListener("DOMContentLoaded", function () {
    const seats = document.querySelectorAll(".seat");
    const seatInfo = document.querySelector(".seat-info h5");
    const seatSelectedInfo = document.querySelector(".seat-selected-info");
    let passengerCount = parseInt(localStorage.getItem("passengerCount"));
    let selectedSeats = [];

    seatInfo.textContent = "Seat: ";

    function updateSeatInfo(event) {
        const seatIndex = parseInt(event.target.dataset.index);
        seatInfo.textContent = `Seat: ${seatIndex + 1}`;
    }

    function toggleSeatSelection(event) {
        const seat = event.target;
        const seatIndex = parseInt(seat.dataset.index);

        if (selectedSeats.includes(seatIndex)) {
            selectedSeats = selectedSeats.filter(index => index !== seatIndex);
            seat.classList.remove("selected");
        } else {
            if (selectedSeats.length < passengerCount) {
                selectedSeats.push(seatIndex);
                seat.classList.add("selected");
            } else {
                const firstSelectedSeat = selectedSeats.shift();
                const firstSeatElement = document.querySelector(`.seat[data-index="${firstSelectedSeat}"]`);
                firstSeatElement.classList.remove("selected");
                selectedSeats.push(seatIndex);
                seat.classList.add("selected");
            }
        }

        updateSelectedSeatsDisplay();

        localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    }

    function updateSelectedSeatsDisplay() {
        if (selectedSeats.length > 0) {
            seatSelectedInfo.textContent = `Seat Selected: ${selectedSeats.join(', ')}`;
        } else {
            seatSelectedInfo.textContent = "Seat Selected: None";
        }
    }

    seats.forEach(seat => {
        seat.addEventListener("mouseover", updateSeatInfo);
        seat.addEventListener("click", toggleSeatSelection);
    });

    updateSelectedSeatsDisplay();

    const reserveButton = document.querySelector(".reserve_button");
    const paymentPopup = document.querySelector(".payment_popup");
    const totalPriceElement = document.getElementById("totalPrice");

    reserveButton.addEventListener("click", function () {
        const departure = localStorage.getItem("departure");
        const destination = localStorage.getItem("destination");
        const routeKey = `${departure}-${destination}`;
        const prices = {
            "Cubao-Baguio": 637.00, "Cubao-Alaminos": 561.00, "Cubao-Dagupan": 526.00, "Cubao-Bolinao": 645.00, "Cubao-Zambales": 488.00,
            "Sampaloc-Baguio": 629.00, "Sampaloc-Alaminos": 553.00, "Sampaloc-Dagupan": 518.00, "Sampaloc-Bolinao": 637.00, "Sampaloc-Zambales": 480.00,
            "Pasay-Baguio": 641.00, "Pasay-Alaminos": 565.00, "Pasay-Dagupan": 530.00, "Pasay-Bolinao": 649.00, "Pasay-Zambales": 492.00,
            "Caloocan-Baguio": 629.00, "Caloocan-Alaminos": 553.00, "Caloocan-Dagupan": 518.00, "Caloocan-Bolinao": 637.00, "Caloocan-Zambales": 480.00,
            "PITX-Baguio": 646.00, "PITX-Alaminos": 569.00, "PITX-Dagupan": 534.00, "PITX-Bolinao": 653.00, "PITX-Zambales": 456.00
        };

        const basePrice = prices[routeKey] || 0;
        const totalPrice = basePrice * passengerCount;

        totalPriceElement.textContent = `₱${totalPrice.toFixed(2)}`;
        paymentPopup.style.display = "flex";
    });

    const confirmPaymentButton = document.getElementById("confirmPayment");
    const paymentAmountInput = document.getElementById("paymentAmount");

    confirmPaymentButton.addEventListener("click", function () {
        const paymentAmount = parseFloat(paymentAmountInput.value);
        const totalPrice = parseFloat(totalPriceElement.textContent.replace('₱', '').replace(',', ''));

        if (paymentAmount >= totalPrice) {
            localStorage.setItem("reservedSeats", JSON.stringify(selectedSeats));
            alert("Payment Successful! Your seats are reserved.");
            paymentPopup.style.display = "none";
        } else {
            alert("Insufficient payment. Please enter the correct amount.");
        }
    });

    window.addEventListener("click", function (event) {
        if (event.target === paymentPopup) {
            paymentPopup.style.display = "none";
        }
    });
});