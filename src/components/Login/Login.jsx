import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contex/UserContext';
import './Login.css'

const Login = () => {
    const location = useLocation();
    const { loginUser } = useContext(AuthContext)


    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/'

    const handleLogIn = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset()
                navigate(from, { replace: true })
            })
            .catch(error => console.error(error))

    }

    return (
        <div className='form-container'>
            <h1 className='form-heading'>Login</h1>
            <form onSubmit={handleLogIn} className='form-content'>
                <div className='form'>
                    <label className='input-label' htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder='email' required />
                </div>
                <div className='form'>
                    <label className='input-label' htmlFor="password">password</label>
                    <input type="password" name="password" placeholder='password' required />
                </div>
                <button className='submit-btn'>
                    Login
                </button>
            </form>
            <p className='link-text'><small>New to Ema-john? <Link to='/signup' className='link'>Create New Account</Link></small></p>
        </div>
    );
};

export default Login;