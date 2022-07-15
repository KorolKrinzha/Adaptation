import { useState } from "react"
import { Route, Navigate } from "react-router-dom";
import axios from "axios";


const ProtectedRoute = ({ children }) => {
    const [auth, setAuth] = useState(true)


    axios
    .post("/api/check_admin", { withCredentials: true })
    .then((response) => {
      if (response["data"]["statusSuccess"]){
          setAuth(true)

        return true      
    }
    else{
        return false
        
    }
    })
    .catch((error) => {
        return false
        
    })





    return auth ? children : <Navigate to="/404" />;
    

  
  
}

export default ProtectedRoute;