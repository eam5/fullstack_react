import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
      <div>
      find countries: <input value={props.searchTerm} onChange={props.handleSearchChange} />
      </div>
  )
}

const Weather = ({place, weather}) => {
  return (
  <div>
  <h3>Current weather in {place.capital} </h3>
  <p>Temperature: {weather.temperature} Celsius</p>
  <img src={weather.weather_icons} alt='weather icon' />
  <p>Wind: {weather.wind_speed} kph {weather.wind_dir}</p>
  </div>
  )
}

const Languages= ({ content }) => {
  const langlist = () => content.map(part =>
    <li key={part.name}>{part.name}</li>
    )
  return (
      <div>
          {langlist()}
      </div>
  )
}

const Countries = ({list, weather, searchTerm, setSearchTerm, showCountry}) => {
  const countriesToShow = showCountry
    ? list
    : list.filter(list => list.name.toLowerCase().includes(searchTerm.toLowerCase()) )

  const rows = () => countriesToShow
    .map(list =>
      <div key={list.name}>
        {list.name} 
        <button onClick={() => setSearchTerm(list.name)}>show</button>
      </div>
    )
    console.log(list.length)
    console.log(rows().length)

  const countryInfo = () => countriesToShow
    .map(list =>
      <div key={list.name}>
        <h2>{list.name}</h2>
        <div>Capital: {list.capital}</div>
        <div>Population: {list.population}</div>
        <h3>Languages</h3>
        <ul>
        <Languages content={list.languages} />
        </ul>
        <img src={list.flag} width='150px' alt='country flag'/>
        <Weather place={list} weather={weather}/>
      </div>
      )

    return rows().length > 15 && rows().length < 250 ? 'Too many matches, narrow search'
        : rows().length <= 15 && rows().length > 1 ? <div>{rows()}</div>
        : rows().length === 1 ? <div>{countryInfo()}</div>
        : 'Enter search term';
  
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showCountry, setShowCountry] = useState(searchTerm)
  const [weather, setWeather] = useState([])
console.log(searchTerm)
console.log(weather)

const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    const params = {
      access_key: process.env.REACT_APP_WEATHER_API_KEY,
      query: 'Helsinki'
    }
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data)
      })
  }

  useEffect(hook, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
        <Filter 
          searchTerm={searchTerm} 
          handleSearchChange={handleSearchChange}
        />
        <Countries 
          list={countries} 
          languages={countries.languages}
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          showCountry={showCountry}
          weather={weather.current}
        />
    </div>
  )
}

export default App