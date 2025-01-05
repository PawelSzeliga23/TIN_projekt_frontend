import React from 'react';
import {useLocation} from 'react-router-dom';
import './Header.css';
import HeaderPublic from './HeaderPublic';
import HeaderClient from './HeaderClient';
import HeaderAdmin from './HeaderAdmin';
import {jwtDecode} from 'jwt-decode';

const Header = () => {
    const location = useLocation();
    const accessToken = localStorage.getItem('accessToken');

    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    if (!accessToken) {
        return <HeaderPublic/>;
    }

    const data = jwtDecode(accessToken);
    const role = data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (role === 'admin') {
        return <HeaderAdmin/>;
    }

    if (role === 'user') {
        return <HeaderClient/>;
    }

    return <HeaderPublic/>;
};

export default Header;
