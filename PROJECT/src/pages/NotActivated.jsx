import React from "react";
import { NavLink, useParams } from "react-router-dom";
import {ReactComponent as FireIcon} from "../assets/404_fire.svg"

const NotActivated = ()=>{
    
  
    return (
    <div>
        <h1 className="text-title">Ивент деактивирован</h1>
        <div className="d-flex justify-content-center my-4" >
            <FireIcon />
        </div>
        <p className="infotext">
        Данное событие Адаптации уже прошло, теперь за него нельзя получить баллы. 
        <br/>
        Если у вас возникли вопросы, обратитесь к администраторам</p>


    </div>
    )
}
export default NotActivated;