import axios from 'axios'
import React, { useState } from 'react'


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
      axios.post("/api/admin/editevent",{
        event_id: event.id,
        title: title,
        description: description,
        value: value,
        withCredentials: true
      }).then(res=>
      {
        if (res['statusSuccess'])
        window.location.reload();
      })

      console.log('dele')
    }

  return (
    <div>
      <button onClick={(e)=>{
        e.preventDefault()
        setDisabled(!disabled)
      }}>Редактировать</button>

      <button onClick={(e)=>deleteEvent(e)}>Удалить</button>


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
          required
          type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>

          <label htmlFor="value">Укажите, будет ли меняться QR код и ссылка на событие
          </label>
          <p className="small-text">Галочка - да, будет меняться после каждого сканирования</p>


          



          </div>
  
        <button type="submit" className="form-button">Обновить ивент</button>
      </form>


    </div>
  )
  
}

export default EditEventForm