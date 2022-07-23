import axios from "axios";
import React, { useEffect, useState } from "react";
import { Sign } from "..";
import ScoreEvents from "./ScoreEvents";

const Score = ()=>{
    const [fisrtname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [count, setCount] = useState(0)

    const [found,setFound] = useState(true)

    useEffect(()=>{
    axios.post("/api/score", {
        withCredentials: true
    }).then(response =>{
      setFirstname(response['data']['firstname'])
      setLastname(response['data']['lastname'])
      setCount(response['data']['count'])
    }).catch(error => {
      if (error.response.status===404) setFound(false)
    } )

  },[])
  
   


    return found ? (
        <div className="EVENTS-textContainer">

        <h1 className="text-title">Адаптация | Баллы</h1>
  
  
          <p className="infotext">Добро пожаловать,  {fisrtname} </p>
  
        <p className="EVENTS-textDescription"> Баллов на вашем счету: </p>
  
          <p className="infonumber"> {count} </p>
  
  
  
        <p className="infotext-small">Участвуйте в дневной части, чтобы заработать еще баллов!
  
          Баллы можно обменять на лицейский мерч и другие призы
        </p>

        <p> Ваши ивенты</p>
        <ScoreEvents />
  
  
      </div>

    ): <Sign/>
}
export default Score