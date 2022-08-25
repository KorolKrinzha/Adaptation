import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Comments = () => {
    const [comments, setComments] = useState([])

    useEffect(()=>{
        axios.get('/api/admin/comments', {
            withCredentials: true
        }).then(
            (response)=>{
              setComments(response.data)
              console.log(response.data)
            })
    },[])

  return (
    <div>{comments.map((comment)=>{
        return <li key={comment.comment_id} className='comments-section' >
        <p >
            <p className='h3 text-success'>* Комментарий по ивенту "{comment.title}": </p>
        <p className='text-comment'>{comment.comment}</p>
        <p className='ps-1'>Время комментария: <strong> {comment.comment_time} </strong> </p> </p>
             </li>
    })}
    </div>
  )
}

export default Comments;
