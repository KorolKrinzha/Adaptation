import { useState } from "react"
import "../styles/style.css"
import Footer from "../components/Footer"
import Cookies from "universal-cookie/es6"


const Sign = () =>{

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [grade, setGrade] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')




    const signUser = (event) =>{
        event.preventDefault();
        console.log(firstname)


        fetch(`/api/loginuser`,{
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }).then(
            res=>res.json()
          ).then(res=>{
            if (res['statusSuccess']){
                let session_token = res['session_token']
                console.log(session_token)
                const cookies = new Cookies()
                cookies.set('session_token', session_token, {path:'/'}) 

            }
            else{
                // создать помечающий текст/попап
                console.log("Ошибка")
            } 

          })
      

    }
    




    return (
     <div className="container -lg">
         <h1 className="title"> Адаптация | Вход</h1>
      <p className="infotext">Для получения баллов
        вам необходимо войти в систему</p>

        <div className="row justify-content-center mt-4">
    <form onSubmit={signUser} className="bg primary">
    <div className="sign-formSection">

    <label htmlFor="email">Мэйл</label>
        <input

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
      <p className="small-text">Еще не зарегистрированы?
                <a href="/sign">Зарегистрируйтесь здесь</a>
              </p>

              

      </div>

      </div>
  </form>
  </div>
  
  </div>

);
}

export default Sign;  