import React, {useEffect} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Home from '../Home/Home';
import About from '../About/About';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Logout from "../Login/Logout";
import RegionList from "../RegionList/RegionList";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import SummitList from "../SummitList/SummitList";
import SummitForm from "../SummitList/SummitForm";
import Summit from "../SummitList/Summit"
import PersonalSummitList from "../SummitList/PersonalSummitList";

const AppRouter = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.location.pathname !== '/') {
            window.location.href = '/';
        }
    }, []);

    return (
        <div className="App">
            <Header/>
            <TransitionGroup className="main-content">
                <CSSTransition
                    key={location.key}
                    timeout={200}
                    classNames="fade"
                >
                    <Routes location={location}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/regions" element={<RegionList/>}/>
                        <Route path="/list" element={<PersonalSummitList/>}/>
                        <Route path="/summits" element={<SummitList role="admin"/>}/>
                        <Route path="/search/public" element={<SummitList role="public"/>}/>
                        <Route path="/search/user" element={<SummitList role="user"/>}/>
                        <Route path="/summit/form" element={<SummitForm/>}/>
                        <Route path="*" element={<Navigate to="/"/>}/>
                        <Route path="/summit/:id" element={<Summit/>}/>
                        <Route path="/summit/form/update/:id" element={<SummitForm/>}/>
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
            <Footer/>
        </div>
    );
};

export default AppRouter;
