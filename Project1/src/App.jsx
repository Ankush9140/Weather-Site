import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import dark from './assets/dark.jpg';
import light from './assets/light.jpg';
import Toggle from './Components/Toggler';
import axios from 'axios'
import TOP from './Components/Top';
import BOTTOM from './Components/Bottom';
import SEARCH from './Components/SEARCH';
function App() {
  const [bg, setBg] = useState(light);
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [color, setColor] = useState('black');
  const [dateTime, setDateTime] = useState(null);
  const [time, setTime] = useState('');
  const[flag,setFlag] = useState(true);
  const backgroundImageStyle = {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  useEffect(() => {
    if(location=='')return;
    const fetchWeatherAndTime = async () => {
        try {
            const weatherPromise = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`);
            const timePromise = axios.get(`https://api.ipgeolocation.io/timezone?apiKey=933cb4c8b9a8418bbb7fb4615ac70534&location=${location},%20UK%27`);
            const [weatherRes, timeRes] = await Promise.all([weatherPromise, timePromise]);
            
            setData(weatherRes.data);
            
            const { dt, timezone } = weatherRes.data;
            const date = new Date((dt + timezone) * 1000);
            setDateTime(date);
            
            setTime(timeRes.data.time_12);
            setLocation('')
        } catch (error) {
            alert("Location Not Found");
            setData(null);
        }
    };
    fetchWeatherAndTime();
}, [flag]);
  const formatDateTime = (date) => {
    if (!date) return '';
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true
    });
  };
  const date = formatDateTime(dateTime).split(',');
  const changer = function () {
    if (bg == light) {
      setBg(dark);
      setColor('white');
    }
    else {
      setBg(light);
      setColor('black');
    }
  };

  return (
    <div style={{ ...backgroundImageStyle, color: color }} className='w-100w-full h-screen relative bg-white bg-opacity-40 text-white'>
      <Toggle changer={changer} />
      <SEARCH flag={flag} setFlag={setFlag} location={location} setLocation={setLocation} color={color}/>
      <div className='flex flex-col justify-between h-3/4'>
        {data != null&&(
          <TOP week={date[0]} date={date[1]} time={time} city={data.name} temp={data.main.temp} weather={data.weather[0].main} />
        )}
      </div>
      <div>
        {data != null&&(
          <BOTTOM feels={data.main.feels_like} humidity={data.main.humidity} wind={data.wind.speed.toFixed()} color={color} />
        )}
      </div>
    </div>
  );
}


export default App;
