import axios from 'axios'

const openweatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const getWeather = (lat, lon) => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openweatherApiKey}&units=metric`)
    .then(response => response.data)
}


export default { getWeather }