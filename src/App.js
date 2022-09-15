import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//scrolltop
import ScrollToTop from './components/ScrollToTop';


//page
// import RestAPI from './pages/RestAPI.js';
import Main from './pages/Main';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Scrolltop from './pages/Scrolltop';
import Post from "./pages/Post";
import AI from "./pages/AI";
import Mypage from './pages/Mypage';
import SolutionsBoard from './pages/SolutionsBoard';
import { AuthProvider } from './context/AuthContext';
import PostUpdate from './pages/Postupdate';

// import { AiOutlinePicture } from "react-icons/ai";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
            <Navbar />
            <Routes>
              <Route path='/' element={<Main />}></Route>
              <Route path='/post' element={<Post />}></Route>
              <Route path='/AI' element={<AI />}></Route>
              <Route path='/Login' element={<LoginPage />}></Route>
              <Route path='/RegisterPage' element={<RegisterPage />}></Route>
              <Route path='/mypage/post' element={<Post />}></Route>
              <Route path='/mypage' element={<Mypage />}></Route>
              <Route path='/solutions' element={<SolutionsBoard />}></Route>
              <Route path='/postupdate' element={<PostUpdate />}></Route>              
            </Routes>
            <Scrolltop />
            <Footer />
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

