const useTimesCalculator = () => {

    const timesCalculator = (weather) => {
    
        const times = {
            Date: '',
            localTime: '',
            UTC_Time: '',
            timezone: '',
            sunriseTime: '',
            sunsetTime: '',
            dayNight: true,
            sunrise: {},
            sunset: {},
            timeDate: {}
        };
    
        if (typeof weather !== 'undefined') {
    
            let d = new Date();
    
            let offset = (weather.timezone) / 60; // mins
            let timeDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes() + offset, d.getUTCSeconds());
            
            let sunriseOffset = offset + (weather.sys.sunrise - weather.dt) / 60;
            let sunsetOffset = offset + (weather.sys.sunset - weather.dt) / 60;
            
            let sunrise = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes() + sunriseOffset, d.getUTCSeconds());
            let sunset = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes() + sunsetOffset, d.getUTCSeconds());
    
            // add local time and timezone     
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
            let day = days[timeDate.getDay()];
            let date = timeDate.getDate();
            let month = months[timeDate.getMonth()];
            let year = timeDate.getFullYear();
    
            let TodayDate = `${day}, ${date} ${month} ${year}`
    
            // let d2 = Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'UTC'}).format(d);
            let LocalTime = timeDate.toLocaleTimeString();
    
            let sign = weather.timezone < 0 ? '-' : '+';
            let timezone = `UTC${sign}${Math.abs(weather.timezone)/3600} Hrs`
    
            let UTCdate = new Date();
            var UTC_Time = UTCdate.toUTCString().slice(-13).slice(0, -3);
            let hr = parseInt(UTC_Time.slice(1, 3));
            let am = (hr > 11) ? 'PM' : 'AM';
            UTC_Time = `${UTC_Time}${am}`;
    
            var SunriseTime = sunrise.toLocaleTimeString();
            SunriseTime = SunriseTime.split(" ");
            SunriseTime = SunriseTime[0].slice(0, -3).concat(' ', SunriseTime[1]);
            
            var SunsetTime = sunset.toLocaleTimeString();
            SunsetTime = SunsetTime.split(" ");
            SunsetTime = SunsetTime[0].slice(0, -3).concat(' ', SunsetTime[1]);
            
            times.Date = TodayDate;
            times.localTime = LocalTime;
            times.timezone = timezone;
            times.UTC_Time = UTC_Time;
            times.sunriseTime = SunriseTime;
            times.sunsetTime = SunsetTime;
            times.dayNight = (timeDate > sunrise && timeDate < sunset) ? true : false;
            times.sunrise = sunrise;
            times.sunset = sunset;
            times.timeDate = timeDate;
        }
        return times;
    }
    return [timesCalculator];
}
export default useTimesCalculator;