import React from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SingleEvent = () =>{
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [grade, setGrade] = useState('')


    let params = useParams()
    const eventPATH = params.eventPATH
    console.log (eventPATH)



    if (typeof eventPATH == 'undefined'){
        return <Navigate to="/404"/>
    }
    else{
        axios.post(`/api/event/${eventPATH}`,
        {withCredentials: true
        }).then(
            response => console.log(response['data'])
        ).catch(error => console.log(error))
        
    }
    return (
        <div>HI {eventPATH}</div>
    );
}

export default SingleEvent;