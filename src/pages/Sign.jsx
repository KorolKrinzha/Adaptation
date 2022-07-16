import { useState } from "react"
import "../styles/style.css"
import Cookies from "universal-cookie/es6"

const Sign = () =>{

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [grade, setGrade] = useState('')
    const [group,setGroup] = useState('')
    const [email, setEmail] = useState('')
    const [response, setRresponse] = useState('')
    const [password, setPassword] = useState('')




    const signUser = (event) =>{
        event.preventDefault();


        fetch(`/api/signuser`,{
            method: "POST",
            body: JSON.stringify({
              firstname: firstname,
              lastname: lastname,
              grade: `${grade} ${group}`,
              email: email,
              password: password
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }).then(
            res => res.json()
          ).then(res=>{
              if (res['statusSuccess']){
                  let session_token = res['session_token']
                  console.log(session_token)
                  const cookies = new Cookies()
                  cookies.set('session_token', session_token, {path:'/'}) 

              }
              else{
                  console.log("Ошибка")
              } 
              
            })
      

    }
    




    return (
     <div className="container -lg">
         <h1 className="title"> Адаптация | Регистрация</h1>
      <p className="infotext">Для получения баллов
        вам необходимо зарегистрироваться <b>под настоящим именем и фамилией</b></p>

        <div className="row justify-content-center mt-4">
    <form onSubmit={signUser} className="bg primary">
    <div className="sign-formSection">
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
      <p className="small-text">Уже зарегистрированы?
                <a href="/login">Выполните вход</a>
              </p>

      </div>

      </div>
  </form>
  </div>
  </div>
);
}

export default Sign;  