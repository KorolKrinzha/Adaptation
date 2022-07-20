import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/style.css"

const AdminHeader = () => {
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
              <NavLink to="/admin/events" className="nav-link">
                  Ивенты
              </NavLink>
  
              </li>
              <li>
              <NavLink to="/admin/scoreboard" className="nav-link">
                  Скорборд
              </NavLink>
              </li>
              <li>
              <NavLink to="/admin/logs" className="nav-link">
                  Логи
              </NavLink>
              </li>
            </ul>
  
          </div>
        </div>
      </nav>
     
      </header>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
        </script>
      </>
      
    );
}
export default AdminHeader;