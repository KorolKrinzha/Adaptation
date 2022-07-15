import React from 'react'
import EventForm from './EditEventForm'

const EventList = ({events,loading}) => {
  if (loading) return <h2>Loading...</h2>
  
  return (
    <ul className='list-group list-group-horizontal px-3'>
      {events.map(event=>(
        <li key={event.id} className='list-group-item'>
          <EventForm event={event}/>
        </li>
      ))}
    </ul>
  )
}

export default EventList;
