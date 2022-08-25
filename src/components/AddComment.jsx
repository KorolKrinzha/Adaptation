import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const AddComment = ({event_id}) => {
    const [comment,setComment]= useState('')
    const addComment = (e) =>{
        e.preventDefault();
        axios.post("/api/addcomment",{

            event_id: event_id,
            comment: comment,
            withCredentials: true
    
        }).then((response)=>{
            if (response.status===200) window.location.reload();
        }).catch((error)=>{
            console.log(error)
        })
    }


  return ( 
<div className="row justify-content-center mt-4">
        <form onSubmit={addComment}>
          <div className="formSection bg-grey">
          
 
             <p className='text-small text-secondary'>Комментарии в дальнейшем помогут нам улучшить ивенты для всех лицеистов!</p>   
            <label htmlFor="description">Ваши впечатления от ивента</label>
            <textarea 
            required
            type="text"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
  
           
  

  
  
            
  
  
  
            </div>
            
            <div className="d-flex justify-content-center">
              <button type="submit" className="form-button">Отправить комментарий</button>
            </div>

        </form>
  
  
      </div>
    
  )
}

export default AddComment