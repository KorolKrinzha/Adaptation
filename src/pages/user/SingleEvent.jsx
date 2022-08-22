import React from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {NotFound} from '../../pages'
import Sign from "../Sign";

const SingleEvent = () =>{
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [found,setFound] = useState(true)
    const [registered, setRegisterd] = useState(true)

    useEffect(()=>{
        axios.post(`/api/event/${eventPATH}`,
        {withCredentials: true
        }).then(
            response => {
                setTitle(response['data']['title'])
                setDescription(response['data']['description'])
                
            }
        ).catch(error => {
            if(error.response.status===404) setFound(false)
            if(error.response.status===403) setRegisterd(false)
        })
    },[])


    let params = useParams()
    const eventPATH = params.eventPATH



    if (typeof eventPATH === 'undefined'){
        return <NotFound/>
    }
    
    return registered ?(
    <>        
        {found ? (
            <div className="EVENTS-textContainer">
                <p className="EVENTS-textTitle">{title}</p>
                <p className="EVENTS-textDescription">{description}</p>
            </div>

        ):<NotFound/>}
    </>

        
    ) : <Sign/>
}

export default SingleEvent;