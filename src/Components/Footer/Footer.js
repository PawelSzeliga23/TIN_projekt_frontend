import React from 'react';
import './Footer.css';
import {Link, useLocation} from "react-router-dom";
import facebook from "../../Content/facebook_733547.png"
import instagram from "../../Content/instagram_2111463.png"
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();
    const location = useLocation();

    if (location.pathname === '/login') return null;

    if (location.pathname === '/register') return null;

    return (
        <footer className="footer">
            <div className="footer-content">
                <section className="footer-links">
                    <h3>{t('links')}:</h3>
                    <ul>
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
                    </ul>
                </section>

                <section className="footer-contact">
                    <h3>{t('contact')}:</h3>
                    <ul>
                        <li>{t('email')}: szczytstrony@gmail.com</li>
                        <li>{t('phone')}: (+48) 123456789</li>
                    </ul>
                </section>

                <section className="footer-social">
                    <h3>{t('media')}:</h3>
                    <ul>
                        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt='facebook' className='mini-logo'/>
                            Facebook
                        </a></li>
                        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src={instagram} alt='instagram' className='mini-logo'/>
                            Instagram
                        </a></li>
                    </ul>
                </section>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 {t('cred')}</p>
            </div>
        </footer>
    );
};

export default Footer;
