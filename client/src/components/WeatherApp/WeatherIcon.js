import { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';

const WeatherIcon = () => {

    const { weather } = useContext(WeatherContext);
    const iconId = weather.weather[0].icon;

    return (
        <img
            className="weatherIcon"
            alt= { `${weather.weather[0].description}` }
            src={ `http://openweathermap.org/img/wn/${iconId}@2x.png` }
        />
    )
}

export default WeatherIcon;