import { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import useFirstRender from '../../hooks/useFirstRender';
import useIsEmpty from '../../hooks/useIsEmpty';
import DayNight from './DayNight';
import { motion } from 'framer-motion';

export const DateBuilder = () => {

    const renderCount = useFirstRender();
    const { weather, times } = useContext(WeatherContext);
    const empty = useIsEmpty(weather);

    return (
        <>
            {(renderCount) ? (
                (!empty && typeof weather !== 'undefined') ? (
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
                        </div>
                        <hr />
                        <div className="row">
                            <div className="column">
                                Timezone<br />{`${times.timezone}`}
                            </div>
                            <div className=" column">
                                UTC Time<br />{`${times.UTC_Time}`}

                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="column">
                                Sunrise<br />{`${times.sunriseTime}`}
                            </div>
                            <div className=" column">
                                Sunset<br />{`${times.sunsetTime}`}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
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