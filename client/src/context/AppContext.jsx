import { message } from 'antd';
import axios from 'axios';
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { toast } from 'react-toastify';

const AppContext=createContext();

const App =({children}) =>{
   const [isLoading,setIsLoading]=useState(false)
   const [doctors,setDoctors]=useState([])
const getDoctors=async()=>{
    setIsLoading(true)
    await axios.get(`${import.meta.env.VITE_apiURL}/doctor/getDoctors`)
    .then(({status,data})=>{
        if(status===200)
        {
            const {doctors,message}=data;
            setDoctors(doctors);
            toast.success(message);
            // console.log(doctors)
        }
    }).catch((error)=>{
        console.error(error)
        toast.error(error?.response?.message)
    }).finally(()=>{
        setIsLoading(false)
    })

}
useEffect(()=>{
    getDoctors();
},[])
return (
    <AppContext.Provider value={{isLoading,doctors}}>
        {children}
    </AppContext.Provider>
  );
}
export const useApp=()=> useContext(AppContext);
export default App