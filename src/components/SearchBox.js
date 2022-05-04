import { useState, useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import axios from 'axios';

const base = "https://api.openweathermap.org/data/2.5/weather?q="
const key = "00fa81d1d7c66ef685600b094490df4a";
export const SearchBox = () => {

    const [query, setQuery] = useState('');
    const { setWeather } = useContext(WeatherContext);

    async function search(evt) {
        if (evt.key === 'Enter') {

            try {
                const res = await axios.get(`${base}${query}&units=metric&APPID=${key}`);
                // console.log(res);
                setWeather(res.data);
                setQuery('');
            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
        <div className="search-box">
            <button className="btn-search"><i className="fas fa-search"></i></button>
            <input 
                type="text" 
                className="input-search" 
                placeholder="Search for any city or country..." 
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
            />
        </div>
    )
}