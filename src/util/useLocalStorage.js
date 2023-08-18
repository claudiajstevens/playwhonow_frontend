import { useEffect, useState } from "react";

// TODO: may need to make token value string
function useLocalState( defaultValue, key) {
    
    const [value, setValue] = useState( () => {
        const localStorageValue = localStorage.getItem(key);

        return localStorageValue !== null 
        ? String(localStorageValue)
        : defaultValue;
    });

    
    useEffect( () => {
        localStorage.setItem(key, String(value)) //value.toString()
    }, [key, value]);

    return [value, setValue];
}


export {useLocalState};