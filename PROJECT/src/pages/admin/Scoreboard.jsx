import React from "react";
import { Route, Navigate } from "react-router-dom";
import ExportButton from "../../components/ExportButton"
import UsersTable from "./UsersTable"

const Scoreboard = ()=> {





    return (
        <>
      <div className="export-table-section">
         <p>Экспортировать пользователей</p>
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

