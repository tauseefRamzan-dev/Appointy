import { message } from 'antd';
import axios from 'axios';
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { toast } from 'react-toastify';

const AppContext=createContext();

const App =({children}) =>{

   const [isLoading,setIsLoading]=useState(false)
   const [doctors,setDoctors]=useState([])
   const [appointments,setAppointments]=useState([])
   
const getDoctors=async()=>{
    setIsLoading(true)
    await axios.get(`${import.meta.env.VITE_apiURL}/doctor/getDoctors`)
    .then(({status,data})=>{
        if(status===200)
        {
            const {doctors,message}=data;
            setDoctors(doctors);
            toast.success(message);
            console.log(doctors)
        }
    }).catch((error)=>{
        console.error(error)
        toast.error(error?.response?.message)
    }).finally(()=>{
        setIsLoading(false)
    })

}

const getAllAppointments=async()=>{
  setIsLoading(true)
    await axios.get(`${import.meta.env.VITE_apiURL}/appointments/getAppointments`)
    .then(({status,data})=>{
        if(status===200)
        {
            const {appointments,message}=data;
            setAppointments(appointments);
            // toast.success(message);
        }
    }).catch((error)=>{
        console.error(error)
        toast.error(error?.response?.data?.message)
    }).finally(()=>{
        setIsLoading(false)
    })
  
}


const completeAppointment=async(_id)=>{
    const token=localStorage.getItem("token")
   await axios.patch(`${import.meta.env.VITE_apiURL}/appointments/appointment_complete/${_id}`,{}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
   )
   .then(({status,data})=>{
    if(status===200)
    {
        const {message}=data;
        toast.success(message);
    }
   }).catch((error)=>{
    console.log(error)
    toast.error(error?.response?.data?.message|| 'Something went wrong.')
   })

}




const cancelAppointment=async(_id)=>{
    const token=localStorage.getItem("token")
   await axios.patch(`${import.meta.env.VITE_apiURL}/appointments/appointment_cancel/${_id}`,{}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
   )
   .then(({status,data})=>{
    if(status===200)
    {
        const {message}=data;
        toast.success(message);
    }
   }).catch((error)=>{
    console.log(error)
    toast.error(error?.response?.data?.message|| 'Something went wrong.')
   })

}
useEffect(()=>{
    getDoctors();
},[])
return (
    <AppContext.Provider value={{isLoading,getDoctors,doctors,setDoctors,getAllAppointments,appointments,cancelAppointment,completeAppointment}}>
        {children}
    </AppContext.Provider>
  );
}
export const useApp=()=> useContext(AppContext);
export default App