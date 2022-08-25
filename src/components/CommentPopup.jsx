import React from 'react'
import { useState } from 'react'
import Popup from './Popup'
import AddComment from './AddComment'

const CommentPopup = ({event_id}) => {
    const [modalOpen, setModalOpen] = useState(false)

  return (<>    
  <button className="infotext-small btn btn-link"
    onClick={()=>setModalOpen(true)}>Оставить анонимный отзыв</button>
      {modalOpen && <Popup title="Добавить комментарий" setModalOpen={setModalOpen}> 
        <AddComment event_id={event_id}/>
        </Popup>}  
        </>
          

  )
}

export default CommentPopup