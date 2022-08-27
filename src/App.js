import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

//scrolltop
import ScrollToTop from './pages/Scrolltop';


//page
import RestAPI from './pages/RestAPI.js';
import Main from './pages/Main';
import RegisterPage from './pages/RegisterPage';
import ImageList from './pages/ImageList';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AI from "./pages/AI";
import { AuthProvider } from './context/AuthContext'

// import { AiOutlinePicture } from "react-icons/ai";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
        <AuthProvider>
        <ScrollToTop />
          <Navbar/>
          {/* <AiOutlinePicture  className='react-icon'/> */}
            <Routes>
                <Route path='/' element={<RestAPI/>}></Route>
                <Route path='/1' element={<Main/>}></Route>
                <Route path='/main' element={<RestAPI/>}></Route>
                <Route path='/dmd' element={<Home/>}></Route>
                <Route path='/ImageList' element={<ImageList/>}></Route>
                <Route path='/AI' element={<AI/>}></Route>
                <Route path='/Login' element={<LoginPage/>}></Route>
                <Route path='/RegisterPage' element={<RegisterPage/>}></Route>
            </Routes>
            {/* </RecoilRoot> */}
          <Footer/>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

