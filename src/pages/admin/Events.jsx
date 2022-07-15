import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import EventList from "./EventList";
import NewEventForm from "./NewEventForm";
import Pagination from "../../components/Pagination";


const Events = ()=> {
  const [events,setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(3)

  useEffect(()=>{
    const fetchEvents = async() =>{
      setLoading(true)
      const res = await axios.get('/api/admin/events')
      setEvents(res.data)
      setLoading(false)
    }
    fetchEvents()
  },[])

  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent)

  const paginate = (pageNumber) =>{
    setCurrentPage(pageNumber)
  }
  
  return (
        <div className="container mt-5">
          <EventList events={currentEvents} loading={loading} />
          <Pagination eventsPerPage={eventsPerPage} totalEvents={events.length} paginate={paginate}/>

          <NewEventForm/>

          
          
          </div>
      );
    }

export default Events;

