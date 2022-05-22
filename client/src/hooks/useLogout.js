import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    // logout  function : set auth to empty object
    // using try catch, make the logout request using axios and set
    // withCredentials: true so that it is able to send back cookies 
    // catch any error with error block.
    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout