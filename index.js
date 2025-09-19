const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Select elements
const input = document.querySelector("#state-input");
const button = document.querySelector("#fetch-alerts");
const alertsDisplay = document.querySelector("#alerts-display");
const errorDiv = document.querySelector("#error-message");

// Button click
button.addEventListener("click", function() {
  const state = input.value.trim().toUpperCase();
  fetchWeatherAlerts(state);
});

// Fetch weather alerts
function fetchWeatherAlerts(state) {
  // Clear previous alerts and hide errors
  alertsDisplay.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  if (!state) {
    errorDiv.textContent = "Please enter a state abbreviation.";
    errorDiv.classList.remove("hidden");
    return;
  }

  fetch(weatherApi + state)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Error fetching data: " + response.status);
      }
      return response.json();
    })
    .then(function(data) {
      // Display alerts
      displayAlerts(data);
      // Clear input after successful fetch
      input.value = "";
    })
    .catch(function(error) {
      errorDiv.textContent = error.message;
      errorDiv.classList.remove("hidden");
      console.log("Error:", error.message);
    });
}

// Display alerts
function displayAlerts(data) {
  const count = data.features.length;

  // Summary in expected format for Jest
  const summary = document.createElement("h2");
  summary.textContent = `Weather Alerts: ${count}`;
  alertsDisplay.appendChild(summary);

  // List of headlines
  const ul = document.createElement("ul");
  data.features.forEach(function(alert) {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  alertsDisplay.appendChild(ul);
}