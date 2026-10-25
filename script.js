
const searchCity = document.getElementById("searchCity");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");

searchBtn.addEventListener("click", function() {
    const searchInput = searchCity.value.trim();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=b636b38c00dbbe4930dc67f42457ad1d&units=metric`;

    if (searchInput === "") {
         document.getElementById("loading").textContent = "Please Enter a City Name.";
        document.querySelector(".weather-result").style.display = "none";
        return;
    } else {
        document.getElementById("loading").textContent = "";
        cityName.textContent = searchInput;

        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("City not found. Please enter a valid city name.");
                }
                return response.json();
            })
            .then(function(data) {
                if (searchInput.toLowerCase() !== data.name.toLowerCase()) {
                    throw new Error("City not found. Please enter a valid city name.");
                }

                document.querySelector(".weather-result").style.display = "block";

                let temp = document.getElementById("temperature");
                temp.textContent = data.main.temp + "°C";

                let condition = document.getElementById("condition");
                condition.textContent = data.weather[0].description.replace(
                    /^./,
                    function(letter) {
                        return letter.toUpperCase();
                    }
                );

                let weatherIcon = document.getElementById("weatherIcon");
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                let humidity = document.getElementById("humidity");
                humidity.textContent = data.main.humidity + "%";

                let wind = document.getElementById("wind");
                wind.textContent = data.wind.speed + "m/s";
            })
            .catch(function(error) {
                document.getElementById("loading").textContent = error.message;
                document.querySelector(".weather-result").style.display = "none";

                document.getElementById("weatherIcon").src = "";
                document.getElementById("temperature").textContent = "";
                document.getElementById("condition").textContent = "";
                document.getElementById("humidity").textContent = "";
                document.getElementById("wind").textContent = "";
            });
    }
});
