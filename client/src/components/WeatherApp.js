import { SearchBox } from './WeatherApp/SearchBox';
import { WeatherContextProvider } from '../context/WeatherContext';
import WeatherComponents from './WeatherComponents';

const WeatherApp = () => {

    return (
        <>
            <h1>Weather App</h1>
            <WeatherContextProvider>
                <SearchBox />
                <WeatherComponents />
            </WeatherContextProvider>
        </>
    )
}

export default WeatherApp