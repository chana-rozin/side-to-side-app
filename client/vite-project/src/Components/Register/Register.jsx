import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import style from './Register.module.css'

const Register = () => {
    const [PW, setPW] = useState({ "password": "", "verifyPW": "" })
    const [isPwVerified, setIsPwVerified] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [registerStep, setRgisterStep] = useState(1);
    const { setCurrentUser } = useContext(userContext);
    const [available, setAvailable] = useState({ username: true, email: true })
    const navigate = useNavigate();
    const user = {
        "name": "",
        "username": "",
        "email": "",
        "address": {
            "street": "",
            "city": "",
            "zipcode": ""
        },
        "phone": "",
        "psw": ""
    }

    async function handleNextBtn(event) {
        event.preventDefault();
        setErrMessage("");
        await fetch(`http://localhost:3000/register/exist?username=${event.target.username.value}&email=${event.target.email.value}`)
            .then(result => result.json())
            .then(json => {
               setAvailable({username:!json.username, email:!json.email})
                if (!json.username && !json.email)
                    requestMoreDetails(event)
            })
            .catch(error => setErrMessage("ERROR try agian"))
    }

    function requestMoreDetails(event) {
        user.username = event.target.username.value;
        user.psw = event.target.password.value;
        user.email = event.target.email.value;
        setRgisterStep(2);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrMessage("");
        user.name = event.target.name.value;
        user.address.street = event.target.street.value;
        user.address.city = event.target.city.value;
        user.address.zipcode = event.target.zipcode.value;
        user.phone = event.target.phone.value;
        addUser();
    }


    async function addUser() {
        await fetch("http://localhost:3000/register", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    delete user["psw"]
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    setCurrentUser(user);
                    navigate("/home", { replace: true });
                }
                else {
                    setErrMessage("500 something get worng:( try latter.")
                }
            })
    }

    useEffect(() => {
        setIsPwVerified(!PW.password == "" && PW.password === PW.verifyPW);
    }, [PW.password, PW.verifyPW])
    console.log(available)
    return (
        <>
            <div className={style.wrapper}>
                <h1>Please sign up</h1>
                <form onSubmit={(event) => handleNextBtn(event)} className={style.inputBox}>
                    <input disabled={registerStep != 1} name="username" type="text" placeholder="username" required />
                    {!(available.username) && <p>usrname already exist</p>}
                    <input disabled={registerStep != 1} required name="email" type="email" placeholder="email" />
                    {!available.email && <p>email already exist</p>}
                    <input disabled={registerStep != 1} placeholder="password" onChange={(e) => setPW(prev => ({ ...prev, password: e.target.value }))} name="password" type="password" />
                    <input disabled={registerStep != 1} placeholder="verify password" onChange={(e) => setPW(prev => ({ ...prev, verifyPW: e.target.value }))} name="verifyPassword" type="password" />
                    {registerStep === 1 &&
                        <button disabled={!isPwVerified} type="submit">Next</button>}
                </form>
                {registerStep === 2 && <form onSubmit={handleSubmit} className={style.inputBox}>
                    <input required name="name" type="text" placeholder="name" />
                    <label>Your address:</label>
                    <input required name="street" type="text" placeholder="street" />
                    <input required name="suite" type="text" placeholder="suite" />
                    <input required name="city" type="text" placeholder="city" />
                    <input required name="zipcode" type="text" placeholder="zipcode" />
                    <input required name="phone" type="text" placeholder="phone" />
                    <div>
                        <button type="submit">submit</button>
                    </div>
                </form>}
            </div>
            <p>{errMessage}</p>
        </>
    )
}
export default Register