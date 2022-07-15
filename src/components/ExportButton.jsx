import React from "react";
import axios from "axios";
import fileDownload from "js-file-download";



const ExportButton = ({fileformat, ...props}) =>{
    const downloadCSV = (e)=>{
        e.preventDefault()
        axios.get(`/api/export/users/${fileformat}`,{
            withCredentials: true,
            responseType: "blob"
        }).then(response => {
            fileDownload(response.data, "users.csv")
        }).catch(error => console.log(error))
    }

    return(
        <div>
        <button onClick={(e)=>downloadCSV(e)}>{props.children}</button>
        </div>
    )

}

export default ExportButton;