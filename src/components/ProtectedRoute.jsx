import { useState } from "react"
import { Route, Navigate } from "react-router-dom";
import axios from "axios";
import { NotFound } from "../pages";



const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(false)
  axios.get('/api/check_user',{
    withCredentials:true
  }).then(res=>{
    if (res.data==='True') setAuth(true)
  })
  return auth ? children:<NotFound/>
}

export default ProtectedRoute;