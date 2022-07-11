import axios from "axios"
import { useState, useEffect } from "react"

const ScoreEvents = () =>{
    const [events, setEvents] = useState([])

    
    useEffect(()=>{
    

    axios.get('api/score/events',
    {
        withCredentials: true
    })
    .then(response => {
    
        const data = response['data']
        console.log(typeof data)
        setEvents(data)
    })
    .catch(err => console.log(err))
},[])



    return (<div>
        {events.map((event) => {
          return <li key={event.event_id}>{event.title}</li>;
          
        })}
    </div>)
}

export default ScoreEvents