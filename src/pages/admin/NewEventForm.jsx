import React, { useState } from "react";
import "../../styles/style.css"
import Popup from "../../components/Popup"

const NewEventForm = ({setModalOpen}) =>{
    const [title, setTitle] = useState("")
    const [state, setState] = useState(true)

    const addEvent = ()=>{

    }


    return (
        <Popup>
            <div className="sections-INTRO">
        <form onSubmit={addEvent}>
        <div className="text-container-INTRO">
          <textarea className="textarea-INTRO"
            minLength={100}
            type="text"
            placeholder="Наблюдения"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>
  
        <button type="submit" className="btn-submit-INTRO">Добавить комментарий</button>
      </form>
      </div>
            
            </Popup>
    )
}

export default NewEventForm;