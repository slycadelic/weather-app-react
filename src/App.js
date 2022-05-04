import './App.css';
import { SearchBox } from './components/SearchBox';
import { LocationBox } from './components/LocationBox';
import { WeatherBox } from './components/WeatherBox';
import { DateBuilder } from './components/DateBuilder';
import { WeatherContextProvider } from './context/WeatherContext';


function App() {

    return (
        <div className="App">
            <WeatherContextProvider>
                <SearchBox />
                <LocationBox className="location-box"/>
                <DateBuilder className="date"/>
                <WeatherBox/>
            </WeatherContextProvider>
        </div>
    );
}

export default App;