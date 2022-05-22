import { useContext } from 'react';
import BadRequest from './BadRequest';
import { WeatherContext } from '../../context/WeatherContext';
import useFirstRender from '../../hooks/useFirstRender';
import useIsEmpty from '../../hooks/useIsEmpty';
import { motion } from 'framer-motion';

export const LocationBox = () => {

    const { weather } = useContext(WeatherContext);
    const renderCount = useFirstRender();
    const empty = useIsEmpty(weather);
    // console.log(weather, empty);
    return (
        <>
            {(renderCount) ? (
                (!empty && typeof weather !== 'undefined') ? (
                    <motion.div
                        className="location container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className='row'>
                            <div className="column">
                                {weather.name}, {weather.sys.country}<br/>
                                <img
                                    alt={weather.sys.country}
                                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${weather.sys.country}.svg`}
                                    width="30" height="20"
                                    className='flag'
                                />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <BadRequest />
                )
            ) : ('')}
        </>
    )
}