import axios from "axios";
import React, { useEffect, useState } from "react";
import ScoreEvents from "./ScoreEvents";

const Score = ()=>{
    const [fisrtname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [count, setCount] = useState(0)

    useEffect(()=>{
    axios.post("/api/score", {
        withCredentials: true
    }).then(response =>{
      console.log(response['data'])
      setFirstname(response['data']['firstname'])
      setLastname(response['data']['lastname'])
      setCount(response['data']['count'])
    }).catch(err => console.log(err))

  },[])
  
   


    return (
        <div className="EVENTS-textContainer">

        <h1 className="title">Адаптация | Баллы</h1>
  
  
          <p className="infotext">Добро пожаловать,  {fisrtname} </p>
  
        <p className="EVENTS-textDescription"> Баллов на вашем счету: </p>
  
          <p className="infonumber"> {count} </p>
  
  
  
        <p className="infotext-small">Участвуйте в дневной части, чтобы заработать еще баллов!
  
          Баллы можно обменять на лицейский мерч и другие призы
        </p>

        <p> Ваши ивенты</p>
        <ScoreEvents />
  
  
      </div>

    )
}
export default Score