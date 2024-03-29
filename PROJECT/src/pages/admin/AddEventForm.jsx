import axios from "axios"
import { useState } from "react"

const CreateEvent = () =>{

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState(1)
    const [dynamic, setDynamic] = useState('')
  
  
  
    const addEvent = ()=>{
  
      axios.post(`/api/admin/createevent`,{
        title: title,
        description: description,
        value: value,
        dynamic: dynamic,
        withCredentials: true
      }).then(response =>{
        console.log(response)
      }).catch(err => console.log(err))
  
    }
  
    return (
      <div className="row justify-content-center mt-4">
        <form onSubmit={addEvent}>
          <div className="formSection bg-grey">
          
          <label htmlFor="title">Название ивента</label>
            <input 
            required
            type="text"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
  
            <label htmlFor="description">Описание ивента</label>
            <textarea 
            required
            type="text"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
  
            <label htmlFor="value">Стоимость ивента</label>
            <input 
            required
            type="number"
            min="1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></input>
  
          <div className="d-flex flex-row">
            <input type='checkbox'     
            onChange={(e) => setDynamic(e.target.value)}
            />
            <label htmlFor="dynamic">Будет ли меняться QR код и ссылка на событие
            </label>
  
  
          </div>
  
  
            
  
  
  
            </div>
            
            <div className="d-flex justify-content-center">
              <button type="submit" className="form-button">ДОБАВИТЬ ИВЕНТ </button>
            </div>

        </form>
  
  
      </div>
    )
  }
export default CreateEvent;  