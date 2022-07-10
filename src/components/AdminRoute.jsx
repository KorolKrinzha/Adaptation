import { useState } from "react"
import { Route, Navigate } from "react-router-dom";
import { check_admin } from "../Auth";
import axios from "axios";


const ProtectedRoute = ({ children }) => {
    const [auth, setAuth] = useState(false)


    axios
    .post("/api/check_admin", { withCredentials: true })
    .then((response) => {
        console.log(response["data"]["statusSuccess"])

      setAuth(response["data"]["statusSuccess"])
      return auth ? children : <Navigate to="/404" />;
    })
    .catch((error) => {
      if (error.response) {
        // обработка ошибок
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
        return auth ? children : <Navigate to="/404" />;
        
      }
      
    });
    

  
  
}

export default ProtectedRoute;