import React, {useState} from 'react';
import './Register.css';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        login: '',
        email: '',
        password: '',
    });

    const validate = (name, value) => {
        let newErrors = {...errors};

        switch (name) {
            case 'login':
                newErrors.login = value ? '' : t("usererror");
                break;

            case 'email':
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                newErrors.email = value && emailRegex.test(value)
                    ? ''
                    : t("emailerror");
                break;

            case 'password':
                const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{6,}$/;
                if (!value) {
                    newErrors.password = t("passerror1");
                } else if (!passwordRegex.test(value)) {
                    newErrors.password =
                        t("passerror2");
                } else {
                    newErrors.password = '';
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validate(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!errors.login && !errors.email && !errors.password) {
            console.log('Form submitted', formData);

            try {
                const response = await fetch('https://localhost:5001/api/register', {
                    method: 'POST',
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                        'Accept-Charset': 'utf-8',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    if (response.status === 400){
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            login: t("login_taken_error"),
                        }));
                    }
                    throw new Error('Bad request');
                }

                navigate('/')

            } catch (err) {
                console.error('Error during login:', err);
            }
        } else {
            console.log('Please fix the errors before submitting');
        }
    };

    return (
        <div className="register-container">
            <h2>{t('account')}</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="input-group">
                    <label htmlFor="login">{t('username')} :</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                    {errors.login && <p className="error">{errors.login}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="password">{t("password")} :</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <button type="submit" className="submit-btn" disabled={Object.values(errors).some((err) => err)}>
                    {t("account")}
                </button>
            </form>
        </div>
    );
};

export default Register;
