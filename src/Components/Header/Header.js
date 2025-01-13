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
    const name = data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    if (role === 'admin') {
        return <HeaderAdmin/>;
    }

    if (role === 'user') {
        return <HeaderClient username={name}/>;
    }

    return <HeaderPublic/>;
};

export default Header;
