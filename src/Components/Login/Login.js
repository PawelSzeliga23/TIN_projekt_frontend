import React, {useState} from 'react';
import './Login.css';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {t} = useTranslation()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const login = username;
        const userData = {login, password};
        console.log("jest to")
        try {
            const response = await fetch('https://localhost:5001/api/login', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Bad request');
            }

            const data = await response.json();

            console.log(data)

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            setError('');

            navigate('/')

        } catch (err) {
            console.error('Error during login:', err);
            setError(t('logerror'));
        }
    };

    return (
        <div className="login-container">
            <h2>{t('login')}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Login :</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">{t('password')} :</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <div className="error">{error}</div>}

                <button type="submit" className="login-btn">
                    {t('login2')}
                </button>
            </form>
        </div>
    );
};

export default Login;
