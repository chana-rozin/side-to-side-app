/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useState } from "react";
import { userContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import bcrypt from 'bcrypt'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser, setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();

  async function handleFormSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    fetch(`http://localhost:3000/login`,{
            method: 'POST',
            body: JSON.stringify({username: username, psw: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
    })
      .then((result) => {console.log(result)})
      .then((json) =>{
        
        json.length ? navigateToHomePage(username) : setErrorMessage("Incorrect username or password")
      }
      )
      .catch((error) => setErrorMessage("ERROR. Please try again"));
  }

  function navigateToHomePage(userDetails) {
    localStorage.setItem("currentUser", JSON.stringify(userDetails));
    navigate("/home");
    setCurrentUser(userDetails);
  }

  return (
    <>
      <div className={style.wrapper}>
        <h1>Please Log In</h1>
        <form onSubmit={handleFormSubmit} className={style.inputBox}>
            <input name="username" type="text" placeholder="username" required />
            <input name="password" type="password" placeholder="password" required />
            <button type="submit">Submit</button>
        </form>
        <p>{errorMessage}</p>
        <p className={style.link}>
          <Link to={"/register"}>sign up</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
