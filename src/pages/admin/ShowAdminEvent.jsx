import React from 'react'
import { useState } from 'react'
import Popup from '../../components/Popup'
import {ReactComponent as SeeButton} from '../../assets/lookevent.svg'
import EditEventForm from './EditEventForm'


const ShowAdminEvent = ({event}) => {
    const [modalOpen, setModalOpen] = useState(false);

  return (
      <div className='d-flex flex-column'>
    <button type='button' className='svg-button' onClick={()=>{setModalOpen(true)}}>
            <SeeButton/>
          </button>
          
          {modalOpen && <Popup title="Редактируйте ивент" setModalOpen={setModalOpen}>
            <EditEventForm event={event}/>  
            </Popup>}         

    </div>
  )
}

export default ShowAdminEvent