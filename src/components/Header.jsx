
import BasicHeader from "./BasicHeader";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import { useState } from "react";

const Header = () => {
  const [admin, setAdmin] = useState(false)

  axios.get('/api/check_admin',{
    withCredentials:true
  }).then(res=>{
    if (res.data==='True') setAdmin(true)
  })


  return admin ? <AdminHeader/> : <BasicHeader/>


}
export default Header;