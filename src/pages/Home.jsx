import React from "react";
import InstructionsSlider from "../components/InstructionsSlider";

const Home = ()=> {
  return (<>    
  <div className="home">
     <p className="mainpage-title">Проект "Адаптация"</p>
     <p className="mainpage-description">Главная задача "Адаптации" – помочь лицеисту
    привыкнуть к жизни в новом для него пространстве, 
    познакомиться с возможностями и требованиями Лицея.</p>

    </div>

    
    <InstructionsSlider/>
    </>

  );
}

export default Home;