import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/style.css"

const Header = () => {
  return (
      <header>
          
    <nav className="navbar" role={"navigation"}>
    <div className="container-fluid">


        <a className="navbar-brand" href="/">
          <img src="/src/svg/SELF_icon.svg" width="40" height="40" className="d-inline-block align-center" alt=""></img>
          SELF
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <NavLink to="/score" className="nav-link">
                Мой аккаунт
            </NavLink>

            </li>
            <li className="nav-item">
            <NavLink to="/timetable" className="nav-link">
                Расписание событий
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/contacts" className="nav-link">
                Контакты
            </NavLink>
            </li>
          </ul>

        </div>
      </div>
    </nav>
   
    </header>
  );
}
export default Header;