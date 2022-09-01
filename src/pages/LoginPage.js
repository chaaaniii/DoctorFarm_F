import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import "./LoginPage.css"

import pw from '../components/img/pw.png';
import email from '../components/img/email.png';
import Drfarm from '../components/img/Dr.Farm.png';

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext)
    return (
        <body className='body-Signup'>
            <div className='login-box'>

                <form onSubmit={loginUser}>
                    <img className="loginlogo" src={Drfarm}></img>
                    <div>
                        <img className='login-icon' src={email} alt='email' />
                        <input type="text" name='email' className='write' placeholder="   E-mail을 입력하세요" />
                    </div>
                    <div>
                        <img className='login-icon' src={pw} alt='password' />
                        <input type="password" name='password' className='write' placeholder="   Password를 입력하세요" />
                    </div>
                    <div className='submit'>
                        <button type="submit" className="btn" onClick='checkPW();'>로그인하기</button>
                        <p className="margin">계정이 없으신가요? <a href='/RegisterPage'>회원가입하러 가기</a></p>
                    </div>

                </form>
            </div>
        </body>
    )
}

export default LoginPage

