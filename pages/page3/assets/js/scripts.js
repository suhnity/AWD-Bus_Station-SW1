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
});