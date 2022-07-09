import React from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";

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

        fetch(`/api/event/${eventPATH}`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            
        }).then(
            res => res.json()
          ).then(res=>{console.log(res)})

    }

    return (
        <div>HI {eventPATH}</div>
    );
}

export default SingleEvent;