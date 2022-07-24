import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import fileDownload from 'js-file-download'
import NotificationContainer from 'react-notifications/lib/NotificationContainer'
import { ReactComponent as DeleteEventButton } from '../../assets/deleteevent.svg'
import { ReactComponent as EditEventButton } from '../../assets/editevent.svg'
import {ReactComponent as DownloadButton} from '../../assets/downloadeventqr.svg'
import { NotificationManager } from 'react-notifications'

import "../../styles/style.css"

import { SITELINK, APIPORT } from '../../env/envvar'

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
        if (res.status===200){
          console.log('Удалено')
          window.location.reload()
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
        NotificationManager.warning('Перезагрузите, чтобы видеть изменения', 'Ивент обновлен', 5000)
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
      <button className='svg-button' onClick={(e)=>{
        e.preventDefault()
        setDisabled(!disabled)
        
      }}>
        <EditEventButton/>
      </button>

      {!event.dynamic &&

      <button className='svg-button' onClick={(e)=>downloadEventQR(e)}>
        <DownloadButton/>
      </button>
      }
      


      <button className='svg-button' onClick={(e)=>deleteEvent(e)}>
        <DeleteEventButton/>
        </button>

        

      <form onSubmit={editEvent}>
        <div className="formSection bg-grey">

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
          min="1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>

          <p>Это {event.dynamic ? "динамичный":"статичный"} ивент</p>

          {!event.dynamic ?
          <a target="_blank" href={`${SITELINK}:${APIPORT}/QR/${event.event_id}`}>QR код ивента</a> : null

          }

          {event.dynamic ? 
          <a target="_blank" href={`${SITELINK}:${APIPORT}/QRDYNAMIC/${event.event_id}`}>QR код ивента</a> : null

          }





          



          </div>
  
        <button type="submit" className="form-button" disabled={disabled}>Обновить ивент</button>
      </form>

      <NotificationContainer/>


    </div>
  )
  
}

export default EditEventForm