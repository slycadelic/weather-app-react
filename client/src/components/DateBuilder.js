import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import useFirstRender from '../hooks/useFirstRender';
import DayNight from './DayNight';
import { motion } from 'framer-motion';
// import SlideToggleContent from './SlideToggleContent';

export const DateBuilder = () => {

    const renderCount = useFirstRender();
    const { weather, times } = useContext(WeatherContext);

    // useEffect(() => {
    //     if (!renderCount || typeof weather === 'undefined') return;
    //     const exp = document.querySelector('.expandable');
    //     if(exp === null) return;
    //     // console.log(exp);
    //     console.log(isActive);
    //     if (!isActive) {
    //         // exp.style.setProperty('height:', '50px');
    //         exp.style.setProperty('overflow', 'visible');
    //         // exp.style.setProperty('height:', 'auto');
    //         // console.log(exp);
    //     } else {
    //         // exp.style.setProperty('height:', '0px');
    //         exp.style.setProperty('overflow', 'hidden');
    //         // exp.style.setProperty('height:', '0px');
    //         // console.log(exp);
    //     }

    // },[isActive])

    // const toggleExp = (sign) => {
    //     console.log('here is toggle');
    //     setActive(!isActive);
    //   };
    // className={isActive ? 'expandable': 'expandable1'


    // const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            {(renderCount) ? (
                (typeof weather.main != 'undefined') ? (
                    <motion.div
                        className="Date container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                    >
                        <div className="row">
                            <div className="column">
                                Date<br />{`${times.Date}`}
                            </div>
                            <div className=" column">
                                Local Time<br />{`${times.localTime}`}
                            </div>
                            {/* <button type="button" onClick={() => setIsVisible(!isVisible)}>
                                {isVisible ? "-" : "+"}
                            </button> */}
                        </div>
                        <div className="row">
                            <div className="column">
                                Timezone<br />{`${times.timezone}`}
                            </div>
                            <div className=" column">
                                UTC Time<br />{`${times.UTC_Time}`}

                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                Sunrise<br />{`${times.sunriseTime}`}
                            </div>
                            <div className=" column">
                                Sunset<br />{`${times.sunsetTime}`}
                            </div>
                        </div>
                        <div className="lastrow">
                            <div className="double-column">
                                <DayNight />
                            </div>
                        </div>
                    </motion.div>
                ) : ('')
            ) : ('')}
        </>
    )

}