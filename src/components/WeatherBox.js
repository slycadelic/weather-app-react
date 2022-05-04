import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

export const WeatherBox = () => {

    const { weather } = useContext(WeatherContext);

    return (
        <>
            {(typeof weather.main != 'undefined') ? (
                <>
                    <div className="temp">
                        <br />
                        {`Temperature: ${weather.main.temp}`} °C
                        <br />
                        {`Feels Like: ${weather.main.feels_like}`} °C
                    </div>
                    <div className="weather">
                        <br />
                        {weather.weather[0].main}
                        <br />
                        {`Description: ${weather.weather[0].description}`}
                    </div>
                </>
            ) : ('')}
        </>
    )
}