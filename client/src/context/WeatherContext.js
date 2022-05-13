import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
    weather: {},
    times: {},
    error: null,
    loading: true
}
const base = "https://api.openweathermap.org/data/2.5/weather?q=";
const key = "00fa81d1d7c66ef685600b094490df4a";

export const WeatherContext = createContext(initialState);

export const WeatherContextProvider = (props) => {
    
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function search(query) {
        try {
            const res = await axios.get(`${base}${query}&units=metric&APPID=${key}`);
            dispatch({
                type: 'GET_WEATHER',
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: 'GET_WEATHER_ERROR',
                payload: error.response.data.error
            });
        }
    }

    return (
        <WeatherContext.Provider value={{ 
            weather: state.weather, 
            times: state.times,
            loading: state.loading, 
            error: state.error, 
            search
        }}>
            { props.children }
        </WeatherContext.Provider>
    )
}