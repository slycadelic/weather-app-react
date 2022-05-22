import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    
    const { setAuth } = useAuth();

    // refresh function that places a get request for refreshing the access token using
    // setting withCredentials: true. This allows us to use cookies with the request as 
    // refresh token (used to renew the access token) is in the cookies.
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, roles: response.data.roles, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;