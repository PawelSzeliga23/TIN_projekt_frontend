import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../Content/logo.png'
import './Header.css'
import {useTranslation} from "react-i18next";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";

const HeaderPublic = () => {
    const {t} = useTranslation();

    return (
        <header className="header">
            <nav>
                <div>
                    <Link to="/">
                        <img src={logo} alt="logo" className='logo'/>
                    </Link>
                </div>
                <div>
                    <ul>
                        <li><Link to="/search/public">
                            <span className="material-symbols-outlined">
                            search
                            </span>
                            {t('search')}
                        </Link></li>
                        <li><Link to="/">
                            <span className="material-symbols-outlined">
                            Home
                            </span>
                            {t('home')}
                        </Link></li>
                        <li><Link to="/about">
                            <span className="material-symbols-outlined">
                            sort
                            </span>
                            {t('about')}
                        </Link></li>
                        <li><Link to="/login">
                            <span className="material-symbols-outlined">
                            login
                            </span>
                            {t('login')}
                        </Link></li>
                        <li><Link to="/register">
                            <span className="material-symbols-outlined">
                            app_registration
                            </span>
                            {t('account')}
                        </Link></li>
                    </ul>
                </div>
            </nav>
            <div className="language-position">
                <LanguageSwitch/>
            </div>
        </header>
    );
};

export default HeaderPublic;