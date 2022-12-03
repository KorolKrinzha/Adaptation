import React from "react";
import { NavLink, useParams } from "react-router-dom";
import {ReactComponent as FireIcon} from "../assets/404_fire.svg"

const NotFound = ()=>{
    
  
    return (
    <div>
        <h1 className="text-title">Ошибка 404</h1>
        <div className="d-flex justify-content-center my-4" >
            <FireIcon />
        </div>
        <p className="infotext">
        Страницы, которую вы ищете, не существует. 
        <br/>
        Пожалуйста, попытайтесь найти нужную вам страницу с помощью шапки сайта</p>

        <p className="infotext-small">
          Примечание: если вы видите эту страницу после сканирования QR-кода, не пугайтесь
          <br/>
          Часть ивентов обновляются и удаляются автоматически
          <br/>          
          Убедитесь, что вы получили свои баллы <NavLink to='/score'>здесь </NavLink>
          <br/>
          Если баллы не начислились, попросите волонтера показать QR-код еще раз
        </p>

    </div>
    )
}
export default NotFound;