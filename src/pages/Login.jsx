import { useState } from "react"
import "../styles/style.css"
import Footer from "../components/Footer"
import Cookies from "universal-cookie/es6"
import axios from "axios"


const Login = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState()




    const logUser = (event) =>{
        event.preventDefault();

        axios.post('/api/loginuser',{
          email:email,
          password:password
        }).then((response)=>
        {
          if (response.status==200){
            let session_token = response.data['session_token']

            const cookies = new Cookies()
            cookies.set('session_token', session_token, {path:'/'}) 
            window.location.reload();

          }
        }).catch((error)=>{
          if (error.response){
          setErrorMessage(error.response.data)
          }
        })


    }
    




    return (
    <div className="container -lg">
         <h1 className="text-title"> Адаптация | Вход</h1>
      <p className="infotext">Для получения баллов
        вам необходимо войти в систему</p>

    <div className="row justify-content-center mt-4">
    <form onSubmit={logUser} className="sign-formSection bg primary">

    <label htmlFor="email">Мэйл</label>
        <input
        type='email'
        placeholder="example@lyceum.ru"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        ></input>

    <label htmlFor="password">Пароль</label>
            <input type="password"
            placeholder=">5 символов" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required></input>

    <div className="middle-textSection">
      <button type="submit" className="form-button">Войти в систему</button>
      <p className="small-text">Еще не зарегистрированы?</p>               
      <a href="/sign">Зарегистрируйтесь здесь</a>
    </div>

  </form>


    <p className="middle-textSection h5">{errorMessage}</p>
  
    </div>
  </div>

);
}

export default Login;   