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
            <ToastContainer/>

    </>
  )
}

export default App