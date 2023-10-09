{
  const input = document.querySelector("input");
  const button = document.querySelector("button");
  const cityName = document.querySelector(".city-name");
  const warning = document.querySelector(".warning");
  const photo = document.querySelector(".photo");
  const weather = document.querySelector(".weather");
  const temperature = document.querySelector(".temperature");
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind");
  const API_UNITS = `&units=metric`;
  const API_KEY = `&appid=0e5a65e429c3e0752390f805968a4188`;
  const API_LINK = `https://api.openweathermap.org/data/2.5/weather?q=`;

  const getApiData = () => {
    const city = input.value || "Vlissingen";
    const API = API_LINK + city + API_KEY + API_UNITS;
    axios
      .get(API)
      .then((response) => {
        const data = response.data;
        cityName.textContent = data.name;
        const temp = data.main.temp;
        temperature.textContent = temp.toFixed(0) + "°C";
        const clouds = data.weather[0].main;
        weather.textContent = clouds;
        const humid = data.main.humidity + "%";
        humidity.textContent = humid;
        const winds = data.wind.speed.toFixed(0) + "km/h";
        wind.textContent = winds;

        const weatherImages = {
          Thunderstorm: "./img/thunderstorm.png",
          Drizzle: "./img/drizzle.png",
          Rain: "./img/rain.png",
          Snow: "./img/ice.png",
          Mist: "./img/fog.png",
          Clear: "./img/sun.png",
          Clouds: "./img/cloud.png",
        };

        const imagePath = weatherImages[clouds] || "./img/unknown.png";
        photo.setAttribute("src", imagePath);
      })
      .catch(() => (warning.textContent = "Enter the correct city name"));
  };

  const onClick = () => {
    button.addEventListener("click", () => {
      getApiData();
      input.value = "";
      warning.textContent = "";
    });
  };

  const enterCheck = (e) => {
    if (e.key === "Enter") {
      getApiData();
      input.value = "";
      warning.textContent = "";
    }
  };

  const init = () => {
    input.addEventListener("keyup", enterCheck);
    getApiData();
    onClick();
  };
  init();
}
