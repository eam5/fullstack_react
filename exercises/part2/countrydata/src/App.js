import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
      <div>
      find countries: <input value={props.searchTerm} onChange={props.handleSearchChange} />
      </div>
  )
}

const Countries = ({list, searchTerm, setSearchTerm, showCountry}) => {
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
          <li>{list.languages.name}</li>
        </ul>
        <img src={list.flag} width='150px' alt='country flag'/>
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
// console.log(countries[0])
// console.log(showCountry)
console.log(searchTerm)

const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
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
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          showCountry={showCountry}
        />
    </div>
  )
}

export default App