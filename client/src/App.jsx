import React from 'react'
import './App.scss'
import Header from "./components/Header/index"
import Footer from './components/Footer'
import Routes from './pages/Routes'
  import { ToastContainer} from 'react-toastify';
const App = () => {
  return (
    <>
    <Routes/>
           <ToastContainer 
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  limit={3}
/>

    </>
  )
}

export default App