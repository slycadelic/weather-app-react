import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

export const LocationBox = () => {

    const { weather } = useContext(WeatherContext);
    // const d = Date.now() + (weather.timezone * 10e6);//((weather.dt*1000) + (weather.timezone * 10e6));
    
    
    
    return (
        <>
            {(typeof weather.main != 'undefined') ? (
                <div className="location">
                    {weather.name}, {weather.sys.country} 
                </div>
            ) : ('')}
        </>
    )
}
