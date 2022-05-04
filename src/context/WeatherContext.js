import { createContext, useState } from 'react';

export const WeatherContext = createContext();

export const WeatherContextProvider = (props) => {
    
    const [weather, setWeather] = useState({});

    return (
        <WeatherContext.Provider value={{weather, setWeather }}>
            { props.children }
        </WeatherContext.Provider>
    )
}