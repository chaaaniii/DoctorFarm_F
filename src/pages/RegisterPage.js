import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import "./RegisterPage.scss"

import pw from '../components/img/pw.png';
import pw2 from '../components/img/pw2.png';
import email from '../components/img/email.png';
import Drfarm from '../components/img/Dr.Farm.png';

const RegisterPage = () => {
    let { registerUser } = useContext(AuthContext)
    return (
        <body className='body-register'>
            <div className='register-box'>
                <form onSubmit={registerUser}>
                    <img className="registerlogo" src={Drfarm}></img>
                    <div>
                        <img className='register-icon' src={email} alt='email' />
                        <input type="text" name='email' className='registerwrite' placeholder="   E-mail을 입력하세요" />
                    </div>
                    <div>
                        <img className='register-icon' src={pw} alt='password' />
                        <input type="password" name='password1' className='registerwrite' placeholder="   Password를 입력하세요" />
                    </div>
                    <div>
                        <img className='register-icon' src={pw2} alt='password' />
                        <input type="password" name='password2' className='registerwrite' placeholder="   Password를 확인하세요" />
                    </div>
                    <div className='submit'>
                        <button type="submit" className="btn" >가입하기</button>
                        <p className="margin">계정이 있으신가요? <a href='/login'>로그인하러 가기</a></p>
                    </div>
                </form>
            </div>
        </body>
    )
}

export default RegisterPage
