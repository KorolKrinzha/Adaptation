import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {NotFound} from '../../pages'


const ShowQR = () =>{




    let params = useParams()
    const eventID = params.eventID
    const [base64, setBase64] = useState()

    const query = useLocation().search
    const dynamic = new URLSearchParams(query).get('dynamic')
    const checkDynamic = (dynamic==='true')
    console.log(typeof checkDynamic)

    useEffect(()=>{
        axios.get(`/QR/${eventID}`,
        {withCredentials:true,
        responseType: 'blob'}).then((response)=>{
            console.log(response.data)
            let binaryData = []
            binaryData.push(response.data)

            const image_data = window.URL.createObjectURL( new Blob(binaryData, {type: 'image/png'}))
            document.getElementById("QR_code").src = image_data


        }).catch(error => console.log(error))
    },[])




    if (typeof eventID === 'undefined') return <NotFound/>
    
    
    return (
        <div className="EVENTS-textContainer">


        {!checkDynamic ?
        <img id="QR_code" alt="Lyceum Adaptation QR code"/> :
        <img src={`/QRDYNAMIC/${eventID}`} alt="Lyceum Adaptation QR code"/> }






    </div>
    )
}

export default ShowQR;