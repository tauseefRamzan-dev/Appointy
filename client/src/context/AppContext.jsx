import { message } from 'antd';
import axios from 'axios';
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { toast } from 'react-toastify';

const AppContext=createContext();
const initialState={isAuth: false, user:{}}
// const reducer = (state,action) => {
//     const {type,payload}=action;
//     const {user}=payload;
// switch (type) {
//     case "SET_LOGIN":
//         return {isAuth:true,user}
//         break;
//     case "SET_LOGOUT":
//         return {isAuth:false,user:{}}
//         break;
//     default:
//         return state;
// }

  
// }
const App =({children}) =>{
//    const [state,dispatch]=useReducer(reducer,initialState);
   const [isLoading,setIsLoading]=useState(true)
   const [doctors,setDoctors]=useState([])
    // const readProfile = async (token, role) => {
    //     if (!token) { 
    //         setIsLoading(false); 
    //         return; 
    //     }

    //     const endpoint= role=== "admin" ? "/auth/admin" : "/auth/doctor";

    //     try {
    //         const { status, data } = await axios.get(`${import.meta.env.VITE_apiURL}${endpoint}`, { 
    //             headers: { Authorization: `Bearer ${token}` } 
    //         });

    //         if (status === 200) {
    //             const { user } = data;
    //             dispatch({ type: "SET_LOGIN", payload: { user } });
                
    //         }
    //     } catch (error) {
    //         console.error("error", error?.response);
    //         if (error?.response?.data?.message === "Invalid or expired token.") {
    //             localStorage.removeItem("token");
    //             localStorage.removeItem("role");
    //         }
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

// useEffect(()=>{
//   const token =localStorage.getItem("token")
//   const role =localStorage.getItem("role")
// readProfile(token,role);
// },[])

//    const handleLogout = async () => {
//         try {
//             localStorage.removeItem("token")
//             localStorage.removeItem("role")
//             dispatch({ type: "SET_LOGOUT", payload: {} })
//             message.success("Logout successful")
//         } catch (error) {
//             console.error(error)
//             message.error("Something went wrong while logging out user.")
//         }
//     }
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