import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=tr&units=metric&appid=f16e28a97fcc72bd51c8c25f61eb475c`

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className='app w-full h-screen relative text-white'>
      <div className='text-center p-4'>
        <input
          className='mt-4 py-3 px-6 text-lg rounded-2xl border-2 border-white text-white bg-transparent placeholder:text-white'
          type='text'
          value={location}
          placeholder='Enter location'
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
        />
      </div>
      <div className='max-w-[700px] h-[700px] m-auto px-4 relative top-[10%] flex flex-col justify-between'>
        <div className='w-full mx-auto my-4'>
          <div className='flex  justify-center flex-col items-center'>
            <h1 className='text-6xl mb-4 uppercase  tracking-widest font-thin'>
              {data.name}
            </h1>
            {data.main ? (
              <h1 className='font-bold text-8xl'>
                {data.main.temp.toFixed()}°C
              </h1>
            ) : null}
            <div className='flex items-center space-x-5 group mt-4'>
              {data.name != undefined && (
                <div className='w-5 h-5 bg-green-400 rounded-full animate-ping'></div>
              )}
              {data.weather ? (
                <div className='text-4xl font-bold uppercase'>
                  {data.weather[0].description}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {data.name != undefined && (
          <div className='flex justify-between items-center w-full my-4 mx-auto p-4 rounded-lg bg-gradient-to-t from-gray-500/50 to-blue-500/40'>
            <div className='space-y-6'>
              {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Hissedilen</p>
            </div>
            <div className='space-y-6'>
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Nem</p>
            </div>
            <div className='space-y-6'>
              {data.wind ? <p>{data.wind.speed} KM</p> : null}
              <p>Rüzgar Hızı</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
