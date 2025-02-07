document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".checkBox input[type='checkbox']");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                checkboxes.forEach((cb) => {
                    if (cb !== checkbox) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
});

let display = document.querySelector(".display");
let days = document.querySelector(".days");
let previous = document.querySelector(".left");
let next = document.querySelector(".right");
let selected = document.querySelector(".selected");

let departButton = document.querySelector(".depart");
let returnButton = document.querySelector(".return");
let calendarContainer = document.querySelector(".container");

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let activeField = null;

calendarContainer.style.display = "none";

function toggleCalendar(field) {
  activeField = field;
  calendarContainer.style.display = "block";
}

function closeCalendar() {
  calendarContainer.style.display = "none";
}

departButton.addEventListener("click", () => toggleCalendar("depart"));
returnButton.addEventListener("click", () => toggleCalendar("return"));

function displayCalendar() {
  days.innerHTML = "";
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayIndex = firstDay.getDay();
  const numberOfDays = lastDay.getDate();

  let formattedDate = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  display.innerHTML = `${formattedDate}`;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const oneWeekLater = new Date(yesterday);
  oneWeekLater.setDate(yesterday.getDate() + 7);

  const yesterdayString = yesterday.toDateString();
  const weekLaterString = oneWeekLater.toDateString();

  for (let x = 1; x <= firstDayIndex; x++) {
    const div = document.createElement("div");
    div.innerHTML = "";
    days.appendChild(div);
  }

  for (let i = 1; i <= numberOfDays; i++) {
    let div = document.createElement("div");
    let currentDate = new Date(year, month, i);

    div.dataset.date = currentDate.toDateString();
    div.innerHTML = i;

     if (currentDate.toDateString() === new Date().toDateString()) {
      div.classList.add("current-date");
    }

    if (currentDate < yesterday || currentDate > oneWeekLater) {
      div.classList.add("disabled");
      div.style.pointerEvents = "none";
    }

    div.addEventListener("mouseover", (e) => {
      if (!e.target.classList.contains("disabled")) {
        const hoveredDate = e.target.dataset.date;
        selected.innerHTML = `Selected Date : ${formatDate(new Date(hoveredDate))}`;
        e.target.classList.add("hover-highlight");
      }
    });

    div.addEventListener("mouseout", (e) => {
      e.target.classList.remove("hover-highlight");
    });

    div.addEventListener("click", (e) => {
      if (!e.target.classList.contains("disabled")) {
        const selectedDate = e.target.dataset.date;
        const formattedSelectedDate = formatDate(new Date(selectedDate));

        if (activeField === "depart") {
          departButton.innerHTML = formattedSelectedDate;
        } else if (activeField === "return") {
          returnButton.innerHTML = formattedSelectedDate;
        }

        closeCalendar();
      }
    });

    days.appendChild(div);
  }
}

function formatDate(date) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}


previous.addEventListener("click", () => {
  days.innerHTML = "";
  selected.innerHTML = "";

  if (month < 0) {
    month = 11;
    year = year - 1;
  }

  month = month - 1;

  date.setMonth(month);

  displayCalendar();
  displaySelected();
});

next.addEventListener("click", () => {
  days.innerHTML = "";
  selected.innerHTML = "";

  if (month > 11) {
    month = 0;
    year = year + 1;
  }

  month = month + 1;
  date.setMonth(month);

  displayCalendar();
  displaySelected();
});

function displaySelected() {
  const dayElements = document.querySelectorAll(".days div");
  dayElements.forEach((day) => {
    day.addEventListener("click", (e) => {
      const selectedDate = e.target.dataset.date;
      selected.innerHTML = `Selected Date: ${formatDate(new Date(selectedDate))}`;
    });
  });
}

displayCalendar();
displaySelected();

document.addEventListener("click", (event) => {
  if (!calendarContainer.contains(event.target) && !departButton.contains(event.target) && !returnButton.contains(event.target)) {
    closeCalendar();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let passengerCount = 1;
  const passengerDisplay = document.getElementById("passenger-count");
  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");

  function updatePassengerCount() {
      localStorage.setItem("passengerCount", passengerCount);
      passengerDisplay.textContent = passengerCount;
  }

  increaseBtn.addEventListener("click", function() {
      if (passengerCount < 5) {
          passengerCount++;
          updatePassengerCount();
      }
  });

  decreaseBtn.addEventListener("click", function() {
      if (passengerCount > 1) {
          passengerCount--;
          updatePassengerCount();
      }
  });

  if (!localStorage.getItem("passengerCount")) {
      updatePassengerCount();
  } else {
      passengerCount = parseInt(localStorage.getItem("passengerCount"));
      passengerDisplay.textContent = passengerCount;
  }
});

document.addEventListener("DOMContentLoaded", function() {
    let passengerCount = 1;
    const passengerDisplay = document.getElementById("passenger-count");
    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");

    increaseBtn.addEventListener("click", function() {
        if (passengerCount < 5) {
            passengerCount++;
            passengerDisplay.textContent = passengerCount;
        }
    });

    decreaseBtn.addEventListener("click", function() {
        if (passengerCount > 1) {
            passengerCount--;
            passengerDisplay.textContent = passengerCount;
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
  const checkboxes = document.querySelectorAll(".checkBox input[type='checkbox']");
  const departure = document.getElementById("departure");
  const destination = document.getElementById("destination");
  const departDate = document.getElementById("depart-date");
  const returnDate = document.getElementById("return-date");
  const searchButton = document.querySelector(".search_button .button");
  const roundTrip = document.getElementById("roundTrip");
  const oneWay = document.getElementById("oneWay");

  function validateForm() {
      const isChecked = roundTrip.checked || oneWay.checked;
      const isDepartureSelected = departure.value !== "";
      const isDestinationSelected = destination.value !== "";
      const isDepartDateSelected = departDate.textContent.trim() !== "Depart";
      const isReturnDateSelected = returnDate.textContent.trim() !== "Return";

      let isValid = false;

      if (roundTrip.checked) {
          isValid = isChecked && isDepartureSelected && isDestinationSelected && isDepartDateSelected && isReturnDateSelected;
      } else if (oneWay.checked) {
          isValid = isChecked && isDepartureSelected && isDestinationSelected && isDepartDateSelected;
      }

      searchButton.disabled = !isValid;
  }

  checkboxes.forEach(checkbox => checkbox.addEventListener("change", validateForm));
  departure.addEventListener("change", validateForm);
  destination.addEventListener("change", validateForm);
  departDate.addEventListener("DOMSubtreeModified", validateForm);
  returnDate.addEventListener("DOMSubtreeModified", validateForm);

  validateForm();
});

document.querySelector(".search_button .button").addEventListener("click", function () {
  const departure = document.getElementById("departure").value;
  const destination = document.getElementById("destination").value;
  const roundTrip = document.getElementById("roundTrip").checked;

  if (departure && destination) {
      localStorage.setItem("departure", departure);
      localStorage.setItem("destination", destination);
      localStorage.setItem("roundTrip", roundTrip);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const searchButton = document.querySelector(".search_button .button");

  searchButton.addEventListener("click", function(event) {
      const departure = document.getElementById("departure").value;
      const destination = document.getElementById("destination").value;
      const roundTrip = document.getElementById("roundTrip").checked;
      const oneWay = document.getElementById("oneWay").checked;
      const departDate = document.getElementById("depart-date").textContent.trim();
      const returnDate = document.getElementById("return-date").textContent.trim();
      const passengerCount = document.getElementById("passenger-count").textContent;

      localStorage.setItem("departure", departure);
      localStorage.setItem("destination", destination);
      localStorage.setItem("tripType", roundTrip ? "Round-trip" : "One-way");
      localStorage.setItem("departDate", departDate);
      localStorage.setItem("returnDate", returnDate);
      localStorage.setItem("passengerCount", passengerCount);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const roundTrip = document.getElementById("roundTrip");
  const oneWay = document.getElementById("oneWay");
  const returnDate = document.getElementById("return-date");

  function toggleReturnDate() {
      if (oneWay.checked) {
          returnDate.style.pointerEvents = "none";
          returnDate.style.opacity = "0.5";
      } else {
          returnDate.style.pointerEvents = "auto";
          returnDate.style.opacity = "1";
      }
  }

  toggleReturnDate();

  oneWay.addEventListener("change", toggleReturnDate);
  roundTrip.addEventListener("change", toggleReturnDate);
});