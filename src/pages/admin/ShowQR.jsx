import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {NotFound} from '../../pages'


const ShowQR = () =>{




    let params = useParams()
    const eventID = params.eventID

    const query = useLocation().search
    const dynamic = new URLSearchParams(query).get('dynamic')
    const checkDynamic = (dynamic==='true')
    console.log(typeof checkDynamic)




    if (typeof eventID === 'undefined') return <NotFound/>
    
    
    return (
        <div className="EVENTS-textContainer">


        {!checkDynamic ?
        <img src={`/QR/${eventID}`} alt="Lyceum Adaptation QR code"/> :
        <img src={`/QRDYNAMIC/${eventID}`} alt="Lyceum Adaptation QR code"/> }






    </div>
    )
}

export default ShowQR;