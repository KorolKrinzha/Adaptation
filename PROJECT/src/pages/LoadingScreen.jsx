import React from 'react'
import {ReactComponent as LoadingIcon} from "../assets/loading.svg"


const LoadingScreen = () => {
  return (
    <div className="NotFound">
        <h1 className="text-title">Загрузка...</h1>
        <div className="d-flex justify-content-center my-4" >
            <LoadingIcon />
        </div>
        
        <p className="infotext">
        Нужная страница вот-вот загрузится. 
        <br/>
        Пожалуйста, ожидайте
        </p>

    </div>
    )
}

export default LoadingScreen