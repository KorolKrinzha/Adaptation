import { useState } from "react"
import "../styles/style.css"


const Sign = () =>{

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [grade, setGrade] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')




    const signUser = (event) =>{
        event.preventDefault();
        console.log(firstname)


        fetch(`/api/signuser`,{
            method: "POST",
            body: JSON.stringify({
              firstname: firstname,
              lastname: lastname,
              grade: grade,
              count: 0,
              events:[],
              email: email,
              password: password
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }).then(
            window.location.reload()
          )
      

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
        onChange={(e) => setGrade(e.target.value)}
        >
                <option disabled selected value>Лицеист</option>
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
      <button type="submit" className="sign-button">Зарегистрироваться</button>
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