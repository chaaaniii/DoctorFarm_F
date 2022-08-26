import { createContext, useState, useEffect } from 'react'
import { getCookie, setCookie, removeCookie  } from '../utils/cookie';
import { useNavigate } from "react-router-dom";
const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [accessToken, setAccessToken] = useState(()=> localStorage.getItem('token') ? localStorage.getItem('token') : null)
    let [loading, setLoading] = useState(true)
    let [user, setUser] = useState(null)
    const navigate = useNavigate();
    let loginUser = async (e )=> {
        e.preventDefault()
        await fetch('http://127.0.0.1:8000/accounts/login/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', data.user.email);
            setAccessToken(data.access_token)
            setCookie('refresh', data.refresh_token)
            setUser(data.user.email);
            console.log(data.user.email)
            // document.location.href = '/1'
            navigate("/1");
        })
        .catch(error => {
            alert(error)
        });
    }


    let logoutUser = async () => {
        let response = await fetch('http://127.0.0.1:8000/accounts/logout/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({refresh: getCookie("refresh"),})
        })
        // setAuthTokens(null)
        console.log('logout')
        setUser(null)
        setAccessToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        removeCookie("refresh");
        alert('logout')
        // history.push('/login')
    }

    let registerUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/accounts/registration/', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'email':e.target.email.value,
                'password1':e.target.password1.value,
                'password2':e.target.password2.value
            })
        })
        let data = await response.json()
        console.log(response.status)
        if(response.status === 200 || response.status === 201){
            setUser(data.user.email);
            setAccessToken(data.access_token);
            localStorage.setItem('token', data.access_token);
            setCookie('refresh', data.refresh_token)
            // history.push('/')
        }else{
            alert('Register Failed!')
        }
    }

    let updateToken = async ()=> {

        let response = await fetch('http://127.0.0.1:8000/accounts/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({refresh: getCookie("refresh"),})
        })

        let data = await response.json()
        
        if (response.status === 200){
            localStorage.setItem('token', data.access_token);
            setAccessToken(data.access_token);
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }





    let contextData = {
        user:user,
        accessToken:accessToken,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser
    }


    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(accessToken){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [accessToken, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
