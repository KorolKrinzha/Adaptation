import React from 'react'
import { useState } from 'react'
import EditEventForm from './EditEventForm'
import ShowAdminEvent from './ShowAdminEvent'



const EventList = ({events,loading}) => {

  if (loading) return <h2>Загрузка...</h2>
  
  return (
    <ul className='list-group px-3'>
      {events.map(event=>(
        <li key={event.event_id} className='eventlist-li'>
          <div className='eventlist-singleItem'>
        <ShowAdminEvent event={event} title={event.title}/>
        
        </div>
          

             

        </li>
      ))}
    </ul>
  )
}

export default EventList;
