import { React, useContext } from "react";
import { userContext } from "../../App";
import { cacheContext } from "../../App";
import Cookies from 'js-cookie';


const AddTodo = (props) => {
    const { setTodosArr, closePopUp } = props;
    const { currentUser } = useContext(userContext);
    const { updateCacheFrequencies } = useContext(cacheContext)
    const userId = currentUser.id;

    const todo = {
        "userId": "0",
        "id": 0,
        "title": "",
        "completed": false,
    };

    async function handleAddBtn(event) {
        event.preventDefault();
        todo.userId = userId;
        todo.title = event.target.title.value,
            addTodo();
        closePopUp();
    }

    async function addTodo() {
        await fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': Cookies.get('token')
            },
        })
            .then(async (respons) => {
                if (respons.ok) {
                    const resBody = await respons.json();
                    todo.id = resBody.insertId
                    let updateData;
                    setTodosArr((prevArr) => {
                        updateData = [...prevArr, todo];
                        return updateData;
                    });
                    localStorage.setItem("todos", JSON.stringify({ user: currentUser.id, data: updateData }))
                    updateCacheFrequencies("todos");
                }
            })
            .catch((error) => console.error(error))
    }

    return (
        <>
            <div className="container">
                <p>add your todo:</p>
                <form onSubmit={handleAddBtn}>
                    <p>completed   <input type="checkbox" name="completed" /></p>
                    <input placeholder="your todo title:" type="text" name="title" />
                    <input type="submit" value="Add"></input>
                </form>
            </div>
        </>
    );
};

export default AddTodo;
