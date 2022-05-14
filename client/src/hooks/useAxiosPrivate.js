import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshTokens";
import useAuth from "./useAuth";

// Attach interceptors to this axiosPrivate instance of axios
const useAxiosPrivate = () => {

    // refresh function to refresh tokens from the useRefreshTokens hook
    const refresh = useRefreshToken();
    // auth state from useAuth hook to authenticate access token  
    const { auth } = useAuth();

    // useEffect hook with dependency on auth state and refresh function 
    // interceptors are like event listeners. They get attached and need
    // to be removed also. 
    useEffect(() => {

        // request interceptor, first argument is a function that triggers before request
        // is sent. Second argument is a function that handles request error. 
        const requestIntercept = axiosPrivate.interceptors.request.use(
            
            // For the first function, check if the authorization header does not exist.
            // Then we know it is the first attempt and not a retry. 
            // If true, set the authorization header to the access token from the auth state.
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        // for the response interceptor, the first argument is a meant for responses where
        // there is no error i.e. response with status code that lie within the range of 2xx
        // will cause this function to trigger. Hence, we pass a function to keep
        //  the response unchanged. 
        // The second argument is for handling any status codes that falls outside the range 
        // of 2xx. This will happen when our accessToken expires. 
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {

                // get the previous request using the config property.
                const prevRequest = error?.config;

                // Check if the error response status is 403 (due to expired access token) 
                // And check a custom property on the request that we will set called 'sent'.
                // Check if 'sent' property does not exist or is not true. 
                // This is done to ensure we don't get in an endless loop of 403 and we 
                // only want do this once.    
                if (error?.response?.status === 403 && !prevRequest?.sent) {

                    // If sent property is not true, set it to true. 
                    prevRequest.sent = true;

                    // Then get a new access token using refresh function.
                    const newAccessToken = await refresh();

                    // Then access the previous request's header and go 
                    // into Authorization setting and pass it our new access token.
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    // return a call to axiosPrivate and pass 
                    // it the prev request so it runs again with the new access token
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        // clean up function inside the useEffect to remove the interceptors
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    // return the axios private instance with the interceptors attached to it. 
    return axiosPrivate;
}

export default useAxiosPrivate;