import React from "react";
import axios from "axios";
import fileDownload from "js-file-download";



const ExportButton = ({fileformat, data,...props}) =>{
    const downloadCSV = (e)=>{
        e.preventDefault()

        axios.get(`/api/export/${data}/${fileformat}`,{
            withCredentials: true,
            responseType: "blob"
        }).then(response => {
            fileDownload(response.data, `${data}.${fileformat}`)
        }).catch(error => console.log(error))
    
    }

    return(
        <div>
        <button onClick={(e)=>downloadCSV(e)}>{props.children}</button>
        </div>
    )

}

export default ExportButton;