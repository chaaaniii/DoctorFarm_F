import React from 'react';
import './Signup.css';
// import logo from '../../img/logo.png'

// // 아이콘 임포트
import id from '../components/img/id.png';
import pw from '../components/img/pw.png';
import pw2 from '../components/img/pw2.png';
import email from '../components/img/email.png';

function Signup() {
    return (
        <body className='body-Signup'>
            <div className='Signup-box'>
                <form className="Signup" action="/Signup" method="post">
                    <div>
                        <img className='sign-icon' src={id} alt='id' />
                        <input type="text" className='write' placeholder="   ID를 입력하세요" />
                    </div>

                    <div>
                        <img className='sign-icon' src={pw} alt='password' />
                        <input type="password" className='write' placeholder="   Password를 입력하세요" />
                    </div>
                    <div>
                        <img className='sign-icon' src={pw2} alt='password2' />
                        <input type="password" className='write' placeholder="   Password를 확인하세요" />
                    </div>
                    <div>
                        <img className='sign-icon' src={email} alt='email' />
                        <input type="email" className='write' placeholder="   E-mail을 입력하세요" />
                    </div>


                    <div className='submit'>
                        <button type="submit" className="btn" onClick='checkPW();'>회원가입하기</button>
                        <p className="margin">계정이 있으신가요? <a href="./login">로그인하러 가기~ :)</a></p>
                    </div>

                </form>
            </div>
        </body>
    );
}

export default Signup;