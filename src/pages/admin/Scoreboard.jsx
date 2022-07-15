import React from "react";
import { Route, Navigate } from "react-router-dom";
import ExportButton from "../../components/ExportButton"
import UsersTable from "./UsersTable"

const Scoreboard = ()=> {


    // const downloadCSV = (e)=>{
    //     e.preventDefault()
    //     axios.get(`/api/export/users/csv`,{
    //         withCredentials: true,
    //         responseType: "blob"
    //     }).then(response => {
    //         fileDownload(response.data, "users.csv")
    //     }).catch(error => console.log(error))
    // }


    return (
        <div className="home">
            <p>Экспортировать пользователей</p>
         <ExportButton fileformat="csv">
         CSV
         </ExportButton>

        <ExportButton fileformat="pdf">
        PDF
        </ExportButton>
        <UsersTable/>


        </div>
      );
    }

export default Scoreboard;

