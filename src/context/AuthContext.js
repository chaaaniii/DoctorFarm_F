import { createContext, useState, useEffect } from 'react'
import { getCookie, setCookie, removeCookie } from '../utils/cookie';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2'
const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [accessToken, setAccessToken] = useState(() => localStorage.getItem('token') ? localStorage.getItem('token') : null)
    let [loading, setLoading] = useState(true)
    let [user, setUser] = useState(null)
    const navigate = useNavigate();
    let loginUser = async (e) => {
        e.preventDefault()
        await fetch('http://211.184.190.112:8000/accounts/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
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
                navigate("/");
            })
            .catch(error => {
                swal.fire({
                    icon: 'error',
                    text: '로그인에 실패하셨습니다!! 다시 확인해주세요.'
                })
                // alert("로그인에 실패하셨습니다!! 다시 확인해주세요~")
            });
    }


    let logoutUser = async () => {
        let response = await fetch('http://211.184.190.112:8000/accounts/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: getCookie("refresh"), })
        })
        // setAuthTokens(null)
        console.log('logout')
        setUser(null)
        setAccessToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        removeCookie("refresh");
        // alert('logout')
        // history.push('/login')
    }

    let registerUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://211.184.190.112:8000/accounts/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': e.target.email.value,
                'password1': e.target.password1.value,
                'password2': e.target.password2.value
            })
        })
        let data = await response.json()
        console.log(response.status)
        if (response.status === 200 || response.status === 201) {
            setUser(data.user.email);
            setAccessToken(data.access_token);
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', data.user.email);
            setCookie('refresh', data.refresh_token)
            swal.fire({
                icon: 'success',
                text: '회원가입이 되셨습니다!🎉'
            })
            // alert('회원가입이 되셨습니다!🎉')
            navigate("/")
            // history.push('/')
        } else {
            swal.fire({
                icon: 'error',
                text: '회원가입에 실패하셨습니다! 다시 시도하세요!!'
            })
            // alert('회원가입에 실패하셨습니다! </br>다시 시도하세요!!')
        }
    }

    let updateToken = async () => {

        let response = await fetch('http://211.184.190.112:8000/accounts/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ refresh: getCookie("refresh"), })
        })

        let data = await response.json()

        if (response.status === 200) {
            localStorage.setItem('token', data.access);
            setAccessToken(data.access_token);
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }





    let contextData = {
        user: user,
        accessToken: accessToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser
    }


    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval = setInterval(() => {
            if (accessToken) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [accessToken, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
