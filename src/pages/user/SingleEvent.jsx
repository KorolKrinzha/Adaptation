import React from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SingleEvent = () =>{
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(()=>{
        axios.post(`/api/event/${eventPATH}`,
        {withCredentials: true
        }).then(
            response => {
                console.log(response['data'])
                setTitle(response['data']['title'])
                setDescription(response['data']['description'])
                
            }
        ).catch(error => console.log(error))
    },[])


    let params = useParams()
    const eventPATH = params.eventPATH



    if (typeof eventPATH == 'undefined'){
        return <Navigate to="/404"/>
    }
    
    return (
        <div className="EVENTS-textContainer">


      
        <p className="EVENTS-textTitle">{title}</p>

        <p className="EVENTS-textTitle">{description}</p>






    </div>
    );
}

export default SingleEvent;