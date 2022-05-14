import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { SearchBox } from './SearchBox';
import { LocationBox } from './LocationBox';
import { WeatherBox } from './WeatherBox';
import { DateBuilder } from './DateBuilder';
import { WeatherContextProvider } from '../context/WeatherContext';

const Home = () => {

    const navigate = useNavigate();

    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <>
        <WeatherContextProvider>
            <SearchBox />
            <>
                <LocationBox />
                <DateBuilder />
                <WeatherBox />
            </>
        </WeatherContextProvider>
        <section>
            <p>You are logged in!</p>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
        </>
    )
}

export default Home
