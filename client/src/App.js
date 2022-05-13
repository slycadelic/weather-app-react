import './styleSheets/App.css';
import './styleSheets/CompStyles.css';
import './styleSheets/DayNight.css';
import { SearchBox } from './components/SearchBox';
import { LocationBox } from './components/LocationBox';
import { WeatherBox } from './components/WeatherBox';
import { DateBuilder } from './components/DateBuilder';
import { WeatherContextProvider } from './context/WeatherContext';
import ThemeSwitch from './components/ThemeSwitch';
import Header from './components/Header';


function App() {

    return (
        <>
            <ThemeSwitch preserveRasters/>
            <Header />
            <div className='App'>
                <WeatherContextProvider>
                    <SearchBox />
                        <>
                            <LocationBox />
                            <DateBuilder/>
                            <WeatherBox />
                        </>
                </WeatherContextProvider>
            </div>
        </>
    );
}

export default App;