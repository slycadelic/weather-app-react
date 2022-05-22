import { useState, useEffect } from "react";

// function to get initial value of user from localStorage
// expanded functionality to use in server side eg.Next.js
const getLocalValue = (key, initValue) => {
    //SSR Next.js 
    if (typeof window === 'undefined') return initValue;

    // if a value is already store 
    const localValue = JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;

    // return result of a function 
    if (initValue instanceof Function) return initValue();

    return initValue;
}

const useLocalStorage = (key, initValue) => {

    // use getLocalValue function to get the initial value
    // from local storage
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage 