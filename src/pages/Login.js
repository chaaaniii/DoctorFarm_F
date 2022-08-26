import React, {useState, useEffect} from 'react';
import './login.css';
// import { useNavigate } from "react-router-dom";
// import logo from '../../img/logo.png'
import { getCookie, setCookie, removeCookie  } from '../utils/cookie';

// // 아이콘 임포트
// import id from '../components/img/id.png';
// import pw from '../components/img/pw.png';

function Login(props) {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState([])

    let [JoinLogin,setJoinLogin] = useState('로그인')

    let [emailname, setEmailname] = useState('')
    let [userpassword, setUserPassword] = useState('')
    let [isAuthenticated, setisAuthenticated] = useState(localStorage.getItem('token'))
    
    // const data = {'username': "", 'email' : emailname, 'password1' : userpassword, 'password2' : userpassword}
    const data = {username: "", email : emailname, password : userpassword}
  
    const handleEmailChange = (e) => {
      setEmailname(e.target.value)
    }
    const handlePasswordChange = (e) => {
      setUserPassword(e.target.value)
    }

    const userHasAuthenticated = (authenticated, email, token, refresh_token) => { 
      setisAuthenticated(authenticated)
      setUser(email)
      // setToken(localStorage.setItem('token', token));
      sessionStorage.setItem('token', token);
      setCookie('refresh', refresh_token)
      // cookie refresh
      // localStorage.setItem('refresh_token', refresh_token);
  
    }//회원가입이나 로그인이 성공했을 때 토큰을 저장

    useEffect(()=>{
      // console.log(isAuthenticated)
      // console.log(localStorage)
      if(isAuthenticated){
        setModal(true)
      }
      else{
        setModal(false)
      }
    },[isAuthenticated])

    // const navigate = useNavigate();


    return (
    <body className='body-login'>
        <div className='login-box'>
            <span>{JoinLogin}</span>
            <form>
            {
              JoinLogin === '로그인'
              ?(
                <>
                <input type="email" placeholder="아이디를 입력하세요" onChange={handleEmailChange}/>
                <input type="password" placeholder="비밀번호를 입력하세요" id="password" onChange={handlePasswordChange}/>
                <button className="JoinLoign-button" onClick={(e)=>{
                e.preventDefault()
                  fetch('http://localhost:8000/accounts/login/', {  
                  method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  })
                  .then(res => res.json())
                  .then(json => {
                    console.log('token->', json.access_token)
                    console.log('data->', data)
                    // user data와 token정보가 일치하면 로그인 성공
                    if (json.user && json.user.email && json.access_token) {
                      userHasAuthenticated(true, json.user.email, json.access_token, json.refresh_token);
                      setModal(true)
                      alert('확인되었습니다!')
                      document.location.href = '/1'
                    }else{
                      alert("아이디 또는 비밀번호를 확인해주세요.")
                    }
                    
                  })
                  .catch(error => alert(error));
                }}>{JoinLogin}</button>
                </>
              )
              :(
                <>
                <input type="email" placeholder="아이디를 입력하세요" onChange={handleEmailChange}/>
                <input type="password" placeholder="비밀번호를 입력하세요" onChange={handlePasswordChange}/>
                <button className="JoinLoign-button" onClick={(e)=>{
                console.log(data)
                e.preventDefault()
                  fetch('http://localhost:8000/accounts/registration/', {
                    method: 'POST',
                    headers:{
                      'Content-Type': 'application/json'
                    },
                    // body: JSON.stringify(data)
                    body: JSON.stringify({
   
                    })
                  }).then(res => res.json())
                  .then(json => {
                    if (json.user.email && json.access_token) {
                      props.userHasAuthenticated(true, json.user.email, json.access_token);
                      props.setModal(true)
                    }else{
                      console.log(json)
                      alert("사용불가능한 아이디입니다.")
                    }
                  })
                  .catch(error => alert(error));
                }}
                >{JoinLogin}</button>
                </>
              )
            }
            
          </form>
          <div className="login-foot">
            {
              JoinLogin === '회원가입'
              ?
              (
                <>
                <span>이미 회원이신가요  ?</span>
                <div className="foot-link" onClick={(e)=>{
                e.preventDefault()
                setJoinLogin('로그인')
                }}>로그인</div>
                </>
              )
              :
              (
                <>
                <span>아직 회원이 아니신가요 ?</span>
                <div className="foot-link" onClick={(e)=>{
                e.preventDefault()
                setJoinLogin('회원가입')
                }}>회원가입</div>
                </>
              )
            }
          </div>
        </div>
      </body>
  )
}
export default Login;