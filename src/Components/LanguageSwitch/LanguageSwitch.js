import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import './LanguageSwitch.css'

const LanguageSwitch = () => {
    const {i18n} = useTranslation();
    const [activeLanguage, setActiveLanguage] = useState(i18n.language);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setActiveLanguage(lng);
    };

    return (
        <div className="language-switcher">
            <button
                className={`language-button ${activeLanguage === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
            >
                EN
            </button>
            <button
                className={`language-button ${activeLanguage === 'pl' ? 'active' : ''}`}
                onClick={() => changeLanguage('pl')}
            >
                PL
            </button>
        </div>
    );
};

export default LanguageSwitch;
