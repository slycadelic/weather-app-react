import { SearchBox } from './WeatherApp/SearchBox';
import { LocationBox } from './WeatherApp/LocationBox';
import { WeatherBox } from './WeatherApp/WeatherBox';
import { DateBuilder } from './WeatherApp/DateBuilder';
import { WeatherContextProvider } from '../context/WeatherContext';

const WeatherApp = () => {

    return (
        <>
            <h1>Weather App</h1>
            <WeatherContextProvider>
                <SearchBox />
                <>
                    <LocationBox />
                    <DateBuilder />
                    <WeatherBox />
                </>
            </WeatherContextProvider>
        </>
    )
}

export default WeatherApp