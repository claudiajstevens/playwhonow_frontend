import { useEffect, useState, Dispatch, SetStateAction } from "react";

function getLocalValue<T>(key: string, initValue: T | (() => T)): T {
    // SSR Next.js
    if (typeof window === 'undefined') return initValue instanceof Function ? initValue() : initValue;

    // if a value is already stored
    const storedValue = localStorage.getItem(key);
    if (storedValue) return JSON.parse(storedValue) as T;

    // return a result of a function
    if (initValue instanceof Function) return initValue();

    return initValue;
}

// TODO: may need to make token value string
function useLocalStorage<T>(key: string, initValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        return getLocalValue<T>(key, initValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;