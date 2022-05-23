import { useEffect, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { WeatherContext } from '../../context/WeatherContext';
import Rain from '../../assets/Sounds/Rain.mp3';
import Sun from '../../assets/Sounds/Sunny.mp3';
import Wind from '../../assets/Sounds/Wind.mp3';
import Thunder from '../../assets/Sounds/Thunder.mp3';
import Drizzle from '../../assets/Sounds/NotRain.mp3';

const AudioPlayer = () => {

    const { weather, audio, setAudio, playing, setPlaying } = useContext(WeatherContext);

    useEffect(() => {

        let Url;

        // https://openweathermap.org/weather-conditions
        if (weather !== null && typeof weather !== 'undefined') {
            const Id = weather.weather[0].id;
            if (Id < 300) { Url = Thunder }
            else if (Id < 400) { Url = Drizzle }
            else if (Id < 700) { Url = Rain }
            else if (Id < 800) { Url = Wind }
            else { Url = Sun }
            const audio = new Audio(Url);
            setAudio(audio);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weather]);


    const toggle = () => {
        setPlaying(!playing);
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }

    useEffect(() => {

        if (weather !== null && typeof weather !== 'undefined' && typeof audio !== 'undefined') {
            playing
                ? audio.play()
                : audio.pause()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playing, audio]);

    useEffect(() => {
        if (weather !== null && typeof weather !== 'undefined' && typeof audio !== 'undefined') {
            audio.addEventListener('ended', () => setPlaying(false));
            return () => {
                audio.removeEventListener('ended', () => setPlaying(false));
            };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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