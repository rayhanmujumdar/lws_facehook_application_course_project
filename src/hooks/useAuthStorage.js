import { useEffect, useState } from 'react';

export default function useLocalStore(key, initialValue) {
    const getValue = JSON.parse(localStorage.getItem(key));
    const [store, setStore] = useState(getValue ? getValue : initialValue);
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(store));
    }, [store]);
    return [store, setStore];
}
