import axios from "axios"
import { useState, useEffect } from "react"
import AddComment from "../../components/AddComment";
import CommentPopup from "../../components/CommentPopup";
import Popup from "../../components/Popup";

const ScoreEvents = () =>{
    const [events, setEvents] = useState([])
    const [modalOpen, setModalOpen] = useState(false);


    
    useEffect(()=>{
    

    axios.get('api/score/events',
    {
        withCredentials: true
    })
    .then(response => {
    
        const data = response['data']
        setEvents(data)
    })
    .catch(error => console.log(error))
},[])


    if (events.length>0){
    return (<div className="score-singleEvent">
        {events.map((event) => {
          return ( <div>
          <li key={event.event_id}>
                <span>V</span>
                <p>{event.title}</p>
              </li>;
              <CommentPopup event_id={event.event_id}/>
              </div>
          )
              
          
        })}
    </div>)
    }
    else{
        return <div>
            <p className="score-noevents">Пока вы не принимали участие в ивентах</p>

            </div>
    }
}

export default ScoreEvents