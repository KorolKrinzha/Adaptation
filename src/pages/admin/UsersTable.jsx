import React, { useEffect, useState } from 'react'
import { useTable, useSortBy } from 'react-table';
import SCOREBOARD_COLUMNS from './columns';
import { useMemo } from 'react';
import axios from 'axios';
import './table.css'
const UsersTable = () => {

  const [users, setusers] = useState([]);

  const fetchusers = async () => {
    const response = await axios
      .get("/api/admin/users")
      .catch((err) => console.log(err));

    if (response) {
      const users = response.data;

      console.log("users: ", users);
      setusers(users);
    }
  }; 

  


  const columns = useMemo(()=>SCOREBOARD_COLUMNS,[])
  const usersData = useMemo(() => [...users], [users]);

  

  


  
  const tableInstance = useTable({
    columns: columns,
    data: usersData
  },
  useSortBy)

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

  useEffect(() => {
    fetchusers();
  }, []);




  return (
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map((headerGroup)=>(
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map((column)=>(
               <th {...column.getHeaderProps(column.getSortByToggleProps({title:"Кликни для сортировки"}))}>
                 {column.render('Header')}
                 <span>
                   {column.isSorted ? (column.isSortedDesc ? '🔽':'🔼') : '🔗'}
                 </span>
               </th>    
                ))}
              <th></th>
            </tr>
          ))}

      </thead>
      <tbody {...getTableBodyProps()}>

                  {
                    rows.map(row=>{
                        prepareRow(row)
                        return (
                          <tr {...row.getRowProps()}>
                            {
                              row.cells.map((cell)=>{
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                              })
                            }
                          </tr>
                        )
                    })
                  }
      </tbody>

    </table>
  )
}

export default UsersTable;