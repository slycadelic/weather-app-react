import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initValue) => {
    
    const [value, setValue] = useLocalStorage(key, initValue);

    const toggler = (value) => {
        setValue(prev => {
            return typeof value === 'boolean' ? value : !prev;
        })
    }
    return [value, toggler];
}

export default useToggle