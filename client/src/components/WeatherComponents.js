import { LocationBox } from './WeatherApp/LocationBox';
import { WeatherBox } from './WeatherApp/WeatherBox';
import { DateBuilder } from './WeatherApp/DateBuilder'

const WeatherComponents = () => {
    
    return (
        <>
            <LocationBox />
            <DateBuilder />
            <WeatherBox />
        </>
    )
}

export default WeatherComponents