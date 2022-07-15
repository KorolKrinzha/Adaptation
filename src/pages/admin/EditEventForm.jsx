import axios from 'axios'
import React, { useState } from 'react'
import { ReactComponent as DeleteEventButton } from '../../assets/deleteevent.svg'
import { ReactComponent as EditEventButton } from '../../assets/editevent.svg'
import { Link } from 'react-router-dom'


const EditEventForm = ({event}) => {
    const [title, setTitle] = useState(event.title)
    const [description, setDescription] = useState(event.description)
    const [value, setValue] = useState(event.value)

    const [disabled, setDisabled] = useState(true)

    const deleteEvent = (e) =>{
      e.preventDefault()
      axios.post("/api/admin/deleteevent",{
      event_id: event.id,
      withCredentials: true
      }
      )
      return ''
    }

    const editEvent = () =>{
      console.log("submit")
      axios.post("/api/admin/editevent",{
        event_id: event.event_id,
        title: title,
        description: description,
        value: value,
        withCredentials: true
      }).then(res=>
      {
        if (res['statusSuccess'])
        console.log("Yeeee")
      })

      console.log('dele')
    }

  return (
    <div>
      <button onClick={(e)=>{
        e.preventDefault()
        setDisabled(!disabled)
      }}>
        <EditEventButton/>
      </button>


      <button onClick={(e)=>deleteEvent(e)}>
        <DeleteEventButton/>
        </button>


        <img src={`/QR/${event.event_id}`} alt="Lyceum Adaptation QR code"/>
      

      <form onSubmit={editEvent}>
        <div className="sign-formSection">

        <label htmlFor="title">Название ивента</label>
          <input disabled={disabled}
          required
          type="text"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <label htmlFor="description">Описание ивента</label>
          <textarea 
          disabled={disabled}
          required
            
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="value">Стоимость ивента</label>
          <input 
          disabled={disabled}
          required
          type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>

          <p>Это {event.dynamic ? "динамичный":"статичный"} ивент</p>
          <Link to={`/event/${event.url}`}>Страница ивента</Link>
          


          



          </div>
  
        <button type="submit" className="form-button" disabled={disabled}>Обновить ивент</button>
      </form>


    </div>
  )
  
}

export default EditEventForm