import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/style.css"

const BasicHeader = () => {
    return (
        <>
        <header className="basicheader">
            
      <nav role={"navigation"}>
      <div className="container-fluid">
  
  
          <a className="navbar-brand" href="/">
            <img src="/src/svg/Adaptation_icon.svg" width="40" height="40" className="d-inline-block align-center" alt=""></img>
            Адаптация
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul>
              <li>
              <NavLink to="/score" className="nav-link">
                  Мой аккаунт
              </NavLink>
  
              </li>
              <li>
              <NavLink to="/timetable" className="nav-link">
                  Расписание событий
              </NavLink>
              </li>
              <li>
              <NavLink to="/contacts" className="nav-link">
                  Контакты
              </NavLink>
              </li>
            </ul>
  
          </div>
        </div>
      </nav>
     
      </header>
      <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
      <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
      </>
    );

}

export default BasicHeader;
