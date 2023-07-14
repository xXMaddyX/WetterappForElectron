const searchBtn = document.querySelector('.search-btn');



const apiKey = 'YOUR_API_KEY';
const lang = "de"
let city;
let apiUrl;
let weatherData;




searchBtn.onclick = () => {
    let inp = document.querySelector('.search').value;
    let lowerCaseInp = inp.toLowerCase();
    city = lowerCaseInp;
    apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city},de&APPID=${apiKey}&lang=${lang}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
    // Hier hast du Zugriff auf die Wetterdaten in der 'data'-Variable
        weatherData = data;
        console.log(data);
        processWeatherData(weatherData);
        })
        .catch(error => {
            document.querySelector('.city').innerHTML = `Keine <br> Wetterdaten`;
            console.log('Fehler beim Abrufen der Wetterdaten:', error);
        });

    
    }

    function processWeatherData(data) {
        var temp = data.main.temp;
        var realTemp = temp - 273.15;
        var realTempRound = Math.round(realTemp);
        document.querySelector('.temperatur').textContent = `${realTempRound}°C`;
        console.log(temp);

        var weatherText = data.weather[0].description;
        document.querySelector('.wetter').textContent = `${weatherText}`;
        console.log(weatherText);

        var pressure = data.main.pressure;
        document.querySelector('.data-Luftdruck').innerHTML = `Luftdruck <br> ${pressure} hPa`;
        console.log(pressure);

        var humidity = data.main.humidity;
        document.querySelector('.data-Luftfeuchtigkeit').innerHTML = `Luftfeuchtigkeit <br> ${humidity} %`;
        console.log(humidity);

        var visibility = data.visibility;
        var visCalc = visibility / 1000;
        document.querySelector('.data-Sichtweite').innerHTML = `Sichtweite <br> ${visCalc} Km`;
        console.log(visibility);

        var weatherIcon = data.weather[0].main;
        setIcon(weatherIcon)

        var windSpeed = data.wind.speed;
        var speedInKmh = windSpeed * 3.6;
        var resultWindSpeed = Math.round(speedInKmh);
        document.querySelector('.data-wind').innerHTML = `Wind <br> ${resultWindSpeed} km/h`;
        console.log(windSpeed);

        var cityName = data.name;
        document.querySelector('.city').innerHTML = cityName;


        var windDeg = data.wind.deg;
        console.log(windDeg)
        clacWindDeg(windDeg)
        




        // Weitere Verarbeitung der Wetterdaten...
    }

    function setIcon(data) {
        var lowercaseData = data.toLowerCase(); // Umwandlung in Kleinbuchstaben
        var imageElement = document.querySelector('.image');
        var imagePath;
      
        if (lowercaseData === "clear") {
          imagePath = "img/clearsky.png";
        } else if (lowercaseData === "clouds") {
          imagePath = "img/fewclouds.png";
        } else if (lowercaseData === "drizzle") {
          imagePath = "img/brokenclouds.png";
        } else if (lowercaseData === "thunderstorm") {
          imagePath = "img/thunderstorm.png";
        } else if (lowercaseData === "rain") {
          imagePath = "img/rain.png";
        } else if (lowercaseData === "snow") {
          imagePath = "img/snow.png";
        } else if (lowercaseData === "mist") {
            imagePath = "img/mist.png";
        } else if (lowercaseData === "smoke") {
            imagePath = "img/mist.png";
        } else if (lowercaseData === "haze") {
            imagePath = "img/mist.png";
        } else if (lowercaseData === "dust") {
            imagePath = "img/mist.png";
        } else if (lowercaseData === "fog") {
            imagePath = "img/mist.png";
        } else if (lowercaseData === "ash") {
            imagePath = "img/mist.png";
        } else if (lowercaseData === "sand") {
            imagePath = "img/mist.png";
        } else if (lowercaseData === "squall") {
            imagePath = "img/mist.png";
        } else if (lowercaseData === "tornado") {
            imagePath = "img/mist.png";
        }
      
        imageElement.src = imagePath;
      }

    function clacWindDeg(data) {
        if (data == 0) {
            document.querySelector('.data-wind-deg').innerHTML = `Windrichtung <br> N`;
          } else if (data >= 0 && data <= 90) {
            document.querySelector('.data-wind-deg').innerHTML = `Windrichtung <br> NO`;
          } else if (data == 90) {
            document.querySelector('.data-wind-deg').innerHTML = `Windrichtung <br> O`;
          } else if (data >= 90 && data <= 180) {
            document.querySelector('.data-wind-deg').innerHTML = `Windrichtung <br> SO`;
          } else if (data == 180) {
            document.querySelector('.data-wind-deg').innerHTML = `Windrichtung <br> S`;
          } else if (data >= 180 && data <= 270) {
            document.querySelector('.data-wind-deg').innerHTML = `Windrichtung <br> SW`;
          } else if (data == 270) {
            document.querySelector('.data-wind-deg').innerHTML = `Windrichtung <br> W`;
          } else if (data >= 270 && data <= 359) {
            document.querySelector('.data-wind-deg').innerHTML = `Windrichtung <br> NW`;
          } else {
            document.querySelector('.data-wind-deg').innerHTML = `Windrichtung <br> Unbekannt`;
          }
    }
