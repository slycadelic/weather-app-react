import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

export const DateBuilder = () => {

    const { weather } = useContext(WeatherContext);
    // console.log(weather);
    let d1 = new Date();
    let sign = weather.timezone < 0 ? '-' : '+';
    let d2 = Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'UTC' }).format(d1);
 
    return (
        <>
            {(typeof weather.main != 'undefined') ? (
                    <div className="location">
                        {`${d2}`}
                        <br />
                        {`Timezone: UTC${sign}${Math.abs(weather.timezone)/3600} Hrs`}
                    </div>
            ) : ('')}
        </>
    )

}
