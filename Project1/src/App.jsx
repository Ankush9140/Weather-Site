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
  // State to manage the background image
  const [bg, setBg] = useState(light);
  // State to manage the location input
  const [location, setLocation] = useState('');
  // State to store weather data
  const [data, setData] = useState(null);
  // State to manage text color
  const [color, setColor] = useState('black');
  // State to manage the current date and time
  const [dateTime, setDateTime] = useState(null);
  // State to store the time fetched from API
  const [time, setTime] = useState('');
  // State to trigger useEffect hook to make API calls
  const [flag, setFlag] = useState(true);

  // Style object for the background image
  const backgroundImageStyle = {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  // Effect hook to fetch weather and time data whenever location or flag changes
  useEffect(() => {
    if (location === '') return;
    
    const fetchWeatherAndTime = async () => {
      try {
        // Fetch weather and time data in parallel
        const weatherPromise = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`);
        const timePromise = axios.get(`https://api.ipgeolocation.io/timezone?apiKey=933cb4c8b9a8418bbb7fb4615ac70534&location=${location},%20UK%27`);
        const [weatherRes, timeRes] = await Promise.all([weatherPromise, timePromise]);
        
        // Update state with fetched weather data
        setData(weatherRes.data);
        
        // Calculate and set the local date and time based on fetched data
        const { dt, timezone } = weatherRes.data;
        const date = new Date((dt + timezone) * 1000);
        setDateTime(date);
        
        // Update state with fetched time data
        setTime(timeRes.data.time_12);
        setLocation('');
      } catch (error) {
        alert("Location Not Found");
        setData(null);
      }
    };
    
    fetchWeatherAndTime();
  }, [flag]); // Dependency array

  // Function to format date and time
  const formatDateTime = (date) => {
    if (!date) return '';
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true
    });
  };

  // Split formatted date and time into an array
  const date = formatDateTime(dateTime).split(',');

  // Function to toggle between dark and light modes
  const changer = function () {
    if (bg === light) {
      setBg(dark);
      setColor('white');
    } else {
      setBg(light);
      setColor('black');
    }
  };

  return (
    <div style={{ ...backgroundImageStyle, color: color }} className='w-100w-full h-screen relative bg-white bg-opacity-40 text-white'>
      {/* Toggle component to switch between dark and light modes */}
      <Toggle changer={changer} />
      {/* SEARCH component to handle location input */}
      <SEARCH flag={flag} setFlag={setFlag} location={location} setLocation={setLocation} color={color} />
      <div className='flex flex-col justify-between h-3/4'>
        {/* TOP component to display main weather info */}
        {data != null && (
          <TOP week={date[0]} date={date[1]} time={time} city={data.name} temp={data.main.temp} weather={data.weather[0].main} />
        )}
      </div>
      <div>
        {/* BOTTOM component to display additional weather details */}
        {data != null && (
          <BOTTOM feels={data.main.feels_like} humidity={data.main.humidity} wind={data.wind.speed.toFixed()} color={color} />
        )}
      </div>
    </div>
  );
}

export default App;

