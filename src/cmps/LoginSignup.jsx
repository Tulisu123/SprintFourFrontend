import React, { useState } from 'react';
import { login, signup } from '../store/actions/user.actions'
import { userService } from '../services/user';

export function LoginSignup({ isLoginSignupOpen, setIsLoginSignupOpen, closeLoginSignup }) {
    const [isLoginFailed, setIsLoginFailed] = useState(false)
    const [caredentials, setCaredentials] = useState(userService.getEmptyUser())

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setCaredentials((prevCaredentials) => ({
            ...prevCaredentials,
            [name]: value
        }))
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (isLoginSignupOpen.action === 'login') {
            console.log('Logging in with:', caredentials.username, caredentials.password)
            try {
                await login(caredentials)
                closeLoginSignup()
            } catch {
                setIsLoginFailed(true)
            }
        } else if (isLoginSignupOpen.action === 'signup') {
            signup(caredentials)
            console.log('Signing up with:', caredentials.username, caredentials.password, caredentials.fullname)
        }
    }

    function handleClick(event) {
        event.stopPropagation()
    }

    return (
        <div className="login-signup" onClick={handleClick}>
            <h1 style={{ paddingTop: isLoginSignupOpen.action === 'signup' ? '20px' : '0' }}>{isLoginSignupOpen.action === 'login' ? 'Login' : 'Signup'}</h1>
            <form onSubmit={handleSubmit}>
                {isLoginFailed && <p className="failed-login-err">Operation failed, please try again</p>}
                <div className="form-group">
                    <label htmlFor="username"><span>* </span>Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={caredentials.username}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password"><span>* </span>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={caredentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {isLoginSignupOpen.action === 'signup' && (
                    <div className="form-group">
                        <label htmlFor="fullname"><span>* </span>Full Name:</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={caredentials.fullname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <button type="submit">{isLoginSignupOpen.action === 'login' ? 'Login' : 'Signup'}</button>
            </form>
        </div>
    )
}