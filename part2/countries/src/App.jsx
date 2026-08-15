import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

const SearchInput = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <label htmlFor="search">find countries </label>
      <input id="search" value={searchTerm} onChange={handleSearch} />
    </div>
  )
}

const SearchResults = ({ countries, searchTerm, selectedCountry, setSelectedCountry }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      { filteredCountries.length > 10 && 'Too many matches, specify another filter' }
      { filteredCountries.length <= 10 && filteredCountries.length > 1 && !selectedCountry && filteredCountries.map(country => 
        <p key={country.cca3}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}>show</button>
        </p>
      )}
      { selectedCountry && <CountryDetails country={selectedCountry} />}
      { filteredCountries.length === 1 &&  <CountryDetails country={filteredCountries[0]} /> }
    </div>
  )
}

const CountryDetails = ({ country }) => {
  const [capitalWeather, setCapitalWeather] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather(country.latlng[0], country.latlng[1])
      .then(weather => {
        setCapitalWeather(weather)
      })
  }, [country])


  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => <li key={code}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital}</h2>
      { capitalWeather && <>
        <p>Temperature {capitalWeather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/payload/api/media/file/${capitalWeather.weather[0].icon}.png`} alt={capitalWeather.weather[0].description}/>
        <p>Wind {capitalWeather.wind.speed} m/s</p>
      </>}

    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService.getAll().then((countries) => setCountries(countries))
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    setSelectedCountry(null)
  }

  return (
    <>
      <SearchInput
        searchTerm={searchTerm} 
        handleSearch={handleSearch} 
      />
      { searchTerm && <SearchResults 
        countries={countries} 
        searchTerm={searchTerm} 
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      /> }
    </>
  )
}

export default App
