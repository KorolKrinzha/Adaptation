import axios from 'axios'
import React, { useState } from 'react'
import { ReactComponent as DeleteEventButton } from '../../assets/deleteevent.svg'
import { ReactComponent as EditEventButton } from '../../assets/editevent.svg'
import {ReactComponent as DownloadButton} from '../../assets/downloadeventqr.svg'
import { Link } from 'react-router-dom'
import fileDownload from 'js-file-download'


const EditEventForm = ({event}) => {
    const [title, setTitle] = useState(event.title)
    const [description, setDescription] = useState(event.description)
    const [value, setValue] = useState(event.value)

    const [disabled, setDisabled] = useState(true)

    const deleteEvent = (e) =>{
      e.preventDefault()
      axios.post("/api/admin/deleteevent",{
      event_id: event.event_id,
      withCredentials: true
      }
      ).then((res)=>{
        if (res.response.status===200){
          window.location.reload()
          console.log('Удалено')
        }
      })
      
    }

    const editEvent = (e) =>{
      e.preventDefault()
      axios.post("/api/admin/editevent",{
        event_id: event.event_id,
        title: title,
        description: description,
        value: value,
        withCredentials: true
      }).then(response=>
      {
        if (response.status===200)
        // ! TODO добавить уведомление
        console.log("Редактировано")
      }).catch((error)=>console.log(error.response.status))

    }

    const downloadEventQR = (e) =>{
      e.preventDefault()
      axios.get(`/QR/${event.event_id}.png`,{
        withCredentials: true,
        responseType: "blob"
      }).then((response)=>{
        fileDownload(response.data, `${event.event_id}.png`)
      })

    }


  return (
    <div>
      <button onClick={(e)=>{
        e.preventDefault()
        setDisabled(!disabled)
      }}>
        <EditEventButton/>
      </button>

      <button onClick={(e)=>downloadEventQR(e)}>
        <DownloadButton/>
      </button>


      <button onClick={(e)=>deleteEvent(e)}>
        <DeleteEventButton/>
        </button>


        <img src={`/QR/${event.event_id}`} alt="Lyceum Adaptation QR code" className='img-fluid'/>
      

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