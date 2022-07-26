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
        <>
            <p className="mb-0 pb-0">Экспортировать пользователей</p>
            <div className="d-flex flex-row mt-0 pt-0">
         <ExportButton fileformat="csv" data="users">
         CSV
         </ExportButton>

        <ExportButton fileformat="pdf" data="users">
        PDF
        </ExportButton>
        </div>

        <UsersTable/>


        </>
      );
    }

export default Scoreboard;

