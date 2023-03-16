import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios'
import './weather.css';

function Weather() {
 const [data, setData] = useState({})
 const [location, setLocation] = useState('')

 const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f4307bac7c88a3cfca99d44718ba34bb`

 const searchLocation = (event) => {
        if (event.key === 'Enter') {
        axios.get(url).then((response) => {
            setData(response.data)
            console.log(response.data)
            })
            setLocation('')
        }
    }
  
return (
    <div className='weatherApp'>
        <div className='search'>
            <input 
            value ={location}
            onChange={event => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder='Enter your location'
            type='text' />
        </div>
    <div className='container'>
        <div className="top">
            <div className='location'>
                <h2>{data.name}</h2>
            </div>
            <div className='temp'>
                {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className='description'>
                {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>

            {data.name != undefined &&
            <div className='bottom'>
                <div className='pressure'>
                    {data.main ? <p className='bold'>{data.main.pressure}</p> : null}
                    <p>Pressure</p>
                </div>
                <div className='feels'>
                    {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                        <p>Feels like</p>
                </div>
                <div className='humidity'>
                    {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                        <p>Humidity</p>
                </div>
                <div className='wind'>
                    {data.main ? <p className='bold'>{data.wind.speed.toFixed()}%</p> : null}
                        <p>Wind speed</p>
                </div>
            </div>
            }   
        </div>
    </div>
    </div>
  )
}
export default Weather
  