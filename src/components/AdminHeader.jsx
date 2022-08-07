import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/style.css"
import {ReactComponent as HeaderIcon} from '../assets/headericon.svg' 

const AdminHeader = () => {
    return (
        <header className="basicheader">
            
      <nav role="navigation">
  
          <a className="nav-brand" href="/">
          <HeaderIcon className="d-inline-block align-center"/>
            Адаптация 
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul>
              <li>
              <NavLink to="/admin/events" className="nav-link text-success">
                  Ивенты
              </NavLink>
  
              </li>
              <li>
              <NavLink to="/admin/scoreboard" className="nav-link text-success">
                  Скорборд
              </NavLink>
              </li>
              <li>
              <NavLink to="/admin/logs" className="nav-link text-success">
                  Логи
              </NavLink>
              </li>
            </ul>
  
          </div>
      </nav>
     
      </header>

      
    );
}
export default AdminHeader;