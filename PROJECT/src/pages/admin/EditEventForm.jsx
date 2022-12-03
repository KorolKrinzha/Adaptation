import axios from 'axios'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import fileDownload from 'js-file-download'
import NotificationContainer from 'react-notifications/lib/NotificationContainer'
import { ReactComponent as EditEventButton } from '../../assets/editevent.svg'
import {ReactComponent as DownloadButton} from '../../assets/downloadeventqr.svg'
import {ReactComponent as ReactivateButton} from '../../assets/reactivateevent.svg'
import { NotificationManager } from 'react-notifications'

import "../../styles/style.css"


const EditEventForm = ({event}) => {
    const [title, setTitle] = useState(event.title)
    const [description, setDescription] = useState(event.description)
    const [value, setValue] = useState(event.value)

    const [disabled, setDisabled] = useState(true)

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

        NotificationManager.warning('Перезагрузите, чтобы видеть изменения', 'Ивент обновлен', 5000)
      }).catch((error)=>console.log(error.response.status))

    }

    const downloadEventQR = (e) =>{
      e.preventDefault()
      axios.get(`/api/QR/${event.event_id}`,{
        withCredentials: true,
        responseType: "blob"
      }).then((response)=>{
        fileDownload(response.data, `${event.event_id}.png`)
      })

    }

    const reactivateEvent = (e) =>{
      e.preventDefault()
      axios.post("/api/admin/reactivateevent",{
      event_id: event.event_id,
      withCredentials: true
      }
      ).then((res)=>{
        if (res.status===200){
          console.log('Деактивировано')
          NotificationManager.warning('Перезагрузите, чтобы увидеть его изменненый статус',
          `Ивент ${event.activated ? "деактивирован":"активирован"}`,
          5000)
        }
      })
      
    }



  return (
    <div>

      {!event.dynamic &&

      <button className='svg-button' onClick={(e)=>downloadEventQR(e)}>
        <DownloadButton/>
      </button>
      }

      <button className='svg-button' onClick={(e)=>reactivateEvent(e)}>
        <ReactivateButton/>
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

          {event.activated?  (
          <p>Это {event.dynamic ? "динамичный":"статичный"} ивент</p> )
          : <p>ИВЕНТ ДЕАКТИВИРОВАН</p>}

          {!event.dynamic ?
          <NavLink to={`/QR/${event.event_id}`}>QR код ивента</NavLink> : null

          }

          {event.dynamic ? 
          <NavLink to={`/QR/${event.event_id}?dynamic=true`}>QR код ивента</NavLink> : null

          }





          



          </div>
        {!disabled ?
        <div className='d-flex justify-content-center'>
          <button type="submit" className="form-button" disabled={disabled}> ОБНОВИТЬ ИВЕНТ</button>
        </div> : 

        <div className='d-flex justify-content-center'>
              <button className='form-button' onClick={(e)=>{
                e.preventDefault()
                setDisabled(!disabled)
                
              }}>
                <EditEventButton/>
              </button>

        </div>
              

        }

      </form>

      <NotificationContainer/>


    </div>
  )
  
}

export default EditEventForm