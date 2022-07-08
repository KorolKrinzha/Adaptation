import React from "react";
import { useState } from "react";
import NewEventForm from "./NewEventForm";


const Events = ()=> {
  const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="home">

          <button onClick={()=>{
            setModalOpen(true)
          }}>Создать  ивент
          </button>
          {modalOpen && <NewEventForm setModalOpen={setModalOpen} />}
          
          </div>
      );
    }

export default Events;

