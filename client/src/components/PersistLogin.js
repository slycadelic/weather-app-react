import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshTokens';
import useAuth from '../hooks/useAuth';
import useLocalStorage from "../hooks/useLocalStorage";

// Component will wrap all the protected routes in App 
// Therefore using outlet, all its children will be able to 
// remain logged in if they go to another page or refresh
const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [persist] = useLocalStorage('persist', false);

    // useEffect with empty dependency array to make it run just once
    // when component loads
    useEffect(() => {

        let isMounted = true;

        // function to try to refresh access token using refresh token,
        // catch any errors in case can't refresh access token
        // finally (always runs regardless of result) set isLoading to false
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        // check auth state and use optional chaining to also check accessToken
        // if it does not exist (! at beginning), then call this function. Otherwise
        // set isLoading to false (in case we do not run the function)
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
        // eslint-disable-next-line
    }, [])

    // return JSX that checks isLoading status and returns text if true 
    // or returns Outlet component otherwise (imported from react-router-dom)
    // Outlet represents all the child components and child routes
    // inside the persist login component
    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin