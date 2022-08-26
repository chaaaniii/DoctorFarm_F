import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const RegisterPage = () => {
    let {registerUser} = useContext(AuthContext)
    return (
        <div>
            <form onSubmit={registerUser}>
                <input type="text" name="email" placeholder="Enter Email" />
                <input type="password" name="password1" placeholder="Enter Password" />
                <input type="password" name="password2" placeholder="Enter Password" />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default RegisterPage
