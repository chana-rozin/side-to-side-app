/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { userContext } from "../../App";
import style from "./Info.module.css"

const Info = ()=>{
    const { currentUser, setCurrentUser } = useContext(userContext);
    console.log('current user: ',currentUser)

    return (<>
         <div className={style.details}>
            <h3>your profile:</h3>
            <p>id: {currentUser.id}</p>
            <p>name: {currentUser.name}</p>
            <p>username: {currentUser.username}</p>
            <p>email: {currentUser.email}</p>
            {/* <label><h4>address:</h4>
            <p>street: {currentUser.address.street}</p>
            </label> */}
            <p>phone: {currentUser.phone}</p>
         </div>
    </>)
}

export default Info;