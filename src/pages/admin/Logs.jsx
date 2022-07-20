import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Logs = () => {
    const [logs, setLogs] = useState([])

    useEffect(()=>{
        axios.get('/api/admin/logs', {
            withCredentials: true
        }).then(
            (response)=>setLogs(response.data))
    },[])

  return (
    <div className='mt-4 '>{logs.map((log)=>{
        return <li key={log.log_id} className='h3 text-center'>
             <i> {log.lastname} {log.firstname} </i> посетил(а) ивент <i>{log.title} </i> <strong> {log.visit_time} </strong>
             </li>
    })}
    </div>
  )
}

export default Logs;
