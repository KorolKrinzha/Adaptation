import React, { useState } from "react";
import "../../styles/style.css"
import { ReactComponent as AddEventButton } from '../../assets/addevent.svg'
import CreateEvent from "./AddEventForm";

import Popup from "../../components/Popup"



const NewEventForm = () =>{
      const [modalOpen, setModalOpen] = useState(false);
   
    

    


    return (
      <div>


      <button 
      type="button"
        className="svg-button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <AddEventButton/>
      </button>
     
  {modalOpen && <Popup title="Создайте новый ивент" setModalOpen={setModalOpen}> 
  <CreateEvent/>
  </Popup>}            

            </div>
    )
}

export default NewEventForm;