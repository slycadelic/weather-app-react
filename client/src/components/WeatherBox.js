import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import useFirstRender from '../hooks/useFirstRender';
import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';

export const WeatherBox = () => {

    const renderCount = useFirstRender();
    
    const { weather } = useContext(WeatherContext);
    // console.log(weather)
    // Other info based on other API from https://openweathermap.org/api

    return (
        <>
            {(renderCount) ? (
                (typeof weather !== 'undefined') ? (
                    <motion.div
                        className="container weather"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="row">
                            <div className="column">
                                {weather.weather[0].main}
                            </div>
                            <div className=" column">
                                <WeatherIcon />
                                {`${weather.weather[0].description}`}
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                Avg Temp<br />{`${weather.main.temp}`} °C
                            </div>
                            <div className="column">
                                Feels Like<br />{`${weather.main.feels_like}`} °C
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                Max Temp<br />{`${weather.main.temp_max}`} °C
                            </div>
                            <div className="column">
                                Min Temp<br />{`${weather.main.temp_min}`} °C
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                Wind Speed<br />{`${weather.wind.speed}`} m/s
                            </div>
                            <div className="column">
                                Wind Direction<br />{`${weather.wind.deg}`}°
                            </div>
                        </div>
                        <div className="lastrow">
                            <div className="column">
                                Humidity<br />{`${weather.main.humidity}`} %
                            </div>
                            <div className="column">
                                Pressure<br />{`${weather.main.pressure}`} hPa
                            </div>
                        </div>

                    </motion.div>
                ) : ('')
            ) : ('')}
        </>
    )
}