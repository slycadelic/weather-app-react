import { createContext, useState } from 'react';
import useTimesCalculator from "../hooks/useTimesCalculator";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const WeatherContext = createContext();

export const WeatherContextProvider = (props) => {

    
    const [weather, setWeather] = useState({});
    const [times, setTimes] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const [audio, setAudio] = useState();
    const [playing, setPlaying] = useState(true);

    const [timesCalculator] = useTimesCalculator();

    async function search(query) {
        // console.log(query);
        try {
            const res = await axiosPrivate.get('/weather', {
                params: { cityName: query }
            });
            // console.log(res);
            setWeather(res.data);
            setTimes(timesCalculator(res.data));
        } catch (error) {
            console.log(error);
            setWeather({});
        }
    }

    return (
        <WeatherContext.Provider value={{
            weather, times,
            search,
            audio, setAudio,
            playing, setPlaying
        }}>
            {props.children}
        </WeatherContext.Provider>
    )
}