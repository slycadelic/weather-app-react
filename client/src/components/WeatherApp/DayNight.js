import { useContext, useEffect } from 'react';
import { WeatherContext } from '../../context/WeatherContext';

const DayNight = () => {

    const { times } = useContext(WeatherContext);

    let labels = (times.dayNight) ?
        ['☀', times.sunriseTime.replace(' ', ''), times.sunsetTime.replace(' ', '')]
        : ['☾', times.sunsetTime.replace(' ', ''), times.sunriseTime.replace(' ', '')];

    useEffect(() => {

        const sky = document.querySelector('.sun-path');
        const sunAnimation = document.querySelector('.sun-animation');
        const sunPath = document.querySelector('.sun-symbol-path');

        const dayColors = ['#f7dd31', '#ffff00', '#87cefa', '#FF9F45'];
        const sunPathDayBG = ['#ffcc00', '#f6ff00'];
        const nightColors = ['#020233','#000000','#041C32', '#064663', '#035757'];
        const sunPathNightBG = ['#362106','#000000'];

        const hours = times.timeDate.getHours();
        const hoursSunrise = times.sunrise.getHours();
        const hoursSunset = times.sunset.getHours();
        const duration = times.sunset.getHours() - times.sunrise.getHours();

        const ang = [-88, -70, -58, -48, -44, -32, -27, -20, -13, -8, 0, 8, 13, 20, 27, 32, 
            44, 48, 58, 70, 88];

        if (times.dayNight) {

            let percentVal = Math.round((((hours-hoursSunrise)/duration)*100)/5)*5;
            let percent = Math.round(percentVal).toString().concat('%');
            let rotateZVal = ang[Math.round(percentVal*0.2)];
            let rotateZ = `rotateZ(${rotateZVal}deg)`;
            // console.log(rotateZVal, percentVal);
        
            sky.style.setProperty('background-color', dayColors[Math.round(percentVal/33)]);
            sunAnimation.style.setProperty('background-color', sunPathDayBG[Math.round(percentVal/100)]);
            sunAnimation.style.setProperty('width', percent);
            sunPath.style.setProperty('transform', rotateZ);

        } else {
            
            let hours1 = (hours <= hoursSunrise) ? hours + 24: hours;
            let percentVal = (((hours1-hoursSunset)/(24-duration))*100);
            let percent = (percentVal).toString().concat('%');
            let rotateZVal = ang[Math.round(percentVal*0.2)];
            let rotateZ = `rotateZ(${rotateZVal}deg)`;
            // console.log(rotateZVal, percentVal);
        
            sky.style.setProperty('background-color', nightColors[Math.round(percentVal/33)]);
            sunAnimation.style.setProperty('background-color', sunPathNightBG[Math.round(percentVal/100)]);
            sunAnimation.style.setProperty('width', percent);
            sunPath.style.setProperty('transform', rotateZ);
            // console.log(percentVal,Math.round(percentVal/33),Math.round(percentVal/100));
            // console.log(hours, hoursSunset, duration);
        }
    },[times])

    return (
        <>
            <div className="sun-times">
                <div className="sun-path">
                    <div className="sun-animation">
                    </div>
                </div>
                <div className="sun-symbol-path">
                    <span className={(times.dayNight) ? 'symbol Sun' : 'symbol Moon'}>
                        {`${labels[0]}`}
                    </span>
                </div>
            </div>
            <div className="legend">
                {`${labels[1]}`} {`${labels[2]}`}
            </div>
        </>
    )
}

export default DayNight