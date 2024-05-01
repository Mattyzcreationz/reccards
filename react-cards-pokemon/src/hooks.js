import {useState, useEffect} from 'react';

import axios from 'axios';

function useFlip(fliptstate = true){
    const [isFlipped, setFlipped] = useState(fliptstate);
    const flip  = () => {
        setFlipped(isUp => !isUp);
    };
    return [isFlipped, flip];
}

function useAxios(keyLS, baseUrl){
    const[reps, setrep] = useLocalStorage(keyLS);
    const addrepdata = async(formatter = data => data, restofUrl = '') =>{
        const rep  = await axios.get(`${baseUrl}${restofUrl}`);
        setrep(data => [...data, formatter(rep.data)]);
    };
    const clearrep = () => setrep([]);
    return[reps,  clearrep, addrepdata];
}

function useLocalStorage(key, intval = []){
    if(localStorage.getItem(key)){
        intval = JSON.parse(localStorage.getItem(key));
    }
    const [val, setVal] = useState(intval);
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [val , key]);
    return [value, setVal];
}

export default useLocalStorage;

export{useFlip, useAxios, useLocalStorage};