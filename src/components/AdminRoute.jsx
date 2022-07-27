import { useState } from "react"
import { Route, Navigate } from "react-router-dom";
import axios from "axios";
import { NotFound } from "../pages";
import LoadingScreen from "../pages/LoadingScreen";


const ProtectedRoute = ({ children }) => {
    const [auth, setAuth] = useState(false)
    axios.get('/api/check_admin',{
      withCredentials:true
    }).then(res=>{
      if (res.data==='True') setAuth(true)
    })
    return auth ? children:<LoadingScreen/>
  }

export default ProtectedRoute;