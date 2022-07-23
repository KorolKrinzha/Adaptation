import React from 'react'
import EditEventForm from './EditEventForm'
import Popup from '../../components/Popup'

const EventList = ({events,loading}) => {
  if (loading) return <h2>Загрузка...</h2>
  
  return (
    <ul className='list-group px-3'>
      {events.map(event=>(
        <li key={event.event_id} className='list-group-item'>
          <EditEventForm event={event}/>
        </li>
      ))}
    </ul>
  )
}

export default EventList;
