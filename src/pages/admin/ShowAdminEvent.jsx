import React from 'react'
import { useState } from 'react'
import Popup from '../../components/Popup'
import EditEventForm from './EditEventForm'
import {ReactComponent as SeeButton} from '../../assets/lookevent.svg'
import { ReactComponent as DeleteEventButton } from '../../assets/deleteevent.svg'
import axios from 'axios'

const ShowAdminEvent = ({event, title}) => {
    const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <div className='d-flex flex-column' >

        <div className='d-flex flex-row' onClick={()=>{setModalOpen(true)}}>

          <p className='text-secondary'>{event.title}</p>

          <button type='button' className='svg-button ms-auto'>
              <SeeButton/>
            </button>


          <button className='svg-button' onClick={(e)=>deleteEvent(e)}>
            <DeleteEventButton/>
          </button>

        </div>
          
      {modalOpen && <Popup title="Редактируйте ивент" setModalOpen={setModalOpen}>
        <EditEventForm event={event}/>  
        </Popup>}         

    </div>
  )
}

export default ShowAdminEvent