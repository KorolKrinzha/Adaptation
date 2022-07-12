import React from 'react'
import { useTable } from 'react-table';
import MOCK_DATA from './DATA.json'
import COLUMNS from './columns';
import { useMemo } from 'react';
import './table.css'
const UsersTable = () => {
  const columns = useMemo(()=>COLUMNS,[])
  const data = useMemo(()=>MOCK_DATA,[])
  
  const tableInstance = useTable({
    columns,
    data
  })

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance


  return (
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map((headerGroup)=>(
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map((column)=>(
               <th {...column.getHeaderProps()}>
                 {column.render('Header')}
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