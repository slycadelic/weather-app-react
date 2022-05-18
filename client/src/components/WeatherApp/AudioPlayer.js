import { useContext } from 'react';
import useAudio from '../../hooks/useAudio';
import Rain from '../../assets/Sounds/Rain.mp3';
import Sun from '../../assets/Sounds/NotRain.mp3';
import Wind from '../../assets/Sounds/Wind.mp3';
import Thunder from '../../assets/Sounds/Thunder.mp3';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { WeatherContext } from '../../context/WeatherContext';

const AudioPlayer = () => {

    const { weather } = useContext(WeatherContext);
    const Id = weather.weather[0].id;
    // console.log(Id); 
    // https://openweathermap.org/weather-conditions
    let URL;
    if (Id < 300) {URL = Thunder}
    else if (Id < 700) {URL = Rain}
    else if (Id < 800) {URL = Wind}
    else {URL = Sun}

    const [playing, toggle] = useAudio(URL);

    return (
        <div>
            <button onClick={toggle} className="audioButton">
                {playing
                    ? <FontAwesomeIcon icon={faVolumeHigh} />
                    : <FontAwesomeIcon icon={faVolumeXmark} />
                }
            </button>
        </div>
    );
};

export default AudioPlayer;