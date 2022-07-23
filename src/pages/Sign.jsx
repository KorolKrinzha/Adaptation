import { useState } from "react"
import "../styles/style.css"
import Cookies from "universal-cookie/es6"
import axios from "axios"

const Sign = () =>{

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [grade, setGrade] = useState('')
    const [group,setGroup] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState()




    const signUser = (event) =>{
        event.preventDefault();
        axios.post('/api/signuser',{
          firstname: firstname,
          lastname: lastname,
          grade: `${grade} ${group}`,
          email: email,
          password: password
        }).then((response)=>{
          if (response.status===200){
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
         <h1 className="title"> Адаптация | Регистрация</h1>
      <p className="infotext">Для получения баллов
        вам необходимо зарегистрироваться <b>под настоящим именем и фамилией</b></p>

        <div className="row justify-content-center mt-4">
    <form onSubmit={signUser} className="sign-formSection bg primary">
      <label htmlFor="surname">Фамилия</label>
      <input
          type="text"
          placeholder="Фамилия"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        ></input>
     
     
        <label htmlFor="name">Имя</label>
        <input
          type="text"
          placeholder="Имя"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        ></input>

    <label htmlFor="grade">Направление</label>  
        <select type="" 
        required
        value={grade}
        defaultValue='Лицеист'
        onChange={(e) => setGrade(e.target.value)}
        >
                <option  disabled value=''>Лицеист</option>
                <option>Матинфо</option>
                <option>Восток</option>
                <option>Гум</option>
                <option>Дизайн</option>
                <option>ЕН</option>
                <option>Математика</option>
                <option>Психология</option>
                <option>Соцэк</option>
                <option>Матэк</option>
                <option>Юр</option>
                <option>Футуритет</option>
                <option>Преподаватель</option>

              </select>

    <label htmlFor="group">Кураторская группа</label>
    <input 
          required
          type="number"
          min="1"
          max="6"
            value={group}
            onChange={(e) => setGroup(e.target.value)}>
    </input>

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
            placeholder="******" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required></input>


    <div className="middle-textSection">
      <button type="submit" className="form-button">Зарегистрироваться</button>
      <p className="small-text">Уже зарегистрированы?</p>
      <a href="/login">Выполните вход</a>
    </div>

  </form>
  

    <p className="middle-textSection h5">{errorMessage}</p>

    </div>
  </div>
);
}

export default Sign;  