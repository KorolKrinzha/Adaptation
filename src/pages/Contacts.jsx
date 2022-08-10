import React from "react";

const Contacts = ()=> {
    const people = {
        "Юрий Туровский":"Руководитель проекта",
        "Смирнов Артем":"Главный разработчик",
        "Старцев Евгений":"Консультант по разработке",
        "Паршин Илья":"Главный дизайнерб консультант по разработке"
    }

  return (

    <div className="sections">
        {Object.entries(people).map(([person,responsibility])=>(
            <div key={person} className="contacts-Single-Item">
                <p className="contacts-person">{person}</p>
                <p className="contacts-responsibility">{responsibility}</p>
            </div>
        ))}

        <div className="contacts-developer">
            <p>Если у вас возникли технические вопросы по работе сайта, обратитесь к 
            <a href="https://vk.com/id559309569" target="_blank" > разработчику</a>
            </p>
        </div>


    </div>
  );
}

export default Contacts;