import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/style.css"

const BasicHeader = () => {
    return (
        <header className="basicheader">
            
        <nav role="navigation">
    
            <a className="nav-brand" href="/">
              <img src="/src/svg/Adaptation_icon.svg" width="40" height="40" className="d-inline-block align-center" alt=""></img>
              <a>Адаптация </a>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
              <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul>
                <li>
                <NavLink to="/score" className="nav-link text-success">
                    Мой аккаунт
                </NavLink>
    
                </li>
                <li>
                <NavLink to="/timetable" className="nav-link text-success">
                    Расписание
                </NavLink>
                </li>
                <li>
                <NavLink to="/contacts" className="nav-link text-success">
                    Контакты
                </NavLink>
                </li>
              </ul>
    
            </div>
        </nav>
       
        </header>
    );  

}

export default BasicHeader;
