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
                        <li><Link to="/summits">
                            <span className="material-symbols-outlined">
                            sort
                            </span>
                            {t('summits')}
                        </Link></li>
                        <li><Link to="/regions">
                            <span className="material-symbols-outlined">
                            sort
                            </span>
                            {t('regions')}
                        </Link></li>
                        <li><Link to="/logout">
                            <span className="material-symbols-outlined">
                            logout
                            </span>
                            {t('logout')}
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