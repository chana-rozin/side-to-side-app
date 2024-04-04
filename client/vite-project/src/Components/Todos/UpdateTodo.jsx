import React from "react";
import { useContext } from "react";
import { cacheContext } from "../../App";
import { userContext } from "../../App";
import Cookies from 'js-cookie';


const UpdateTodo = (props) => {
  const { todo, setInEditing, setTodosArr } = props;
  const { updateCacheFrequencies } = useContext(cacheContext);
  const { currentUser } = useContext(userContext);

  async function handleTodoUpdate(event) {
    event.preventDefault();
    todo.title = event.target.title.value;
    todo.completed = event.target.completed.checked;
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': Cookies.get('token')
      },
    })
      .then(response => { 
        switch (response.status) {
        case 204: {
          setInEditing(-1);
          let updateData;
          setTodosArr(prev => {
            updateData = prev.map((el) => (el.id === todo.id ? todo : el));
            return updateData
          }); -
            localStorage.setItem("todos", JSON.stringify({ user: currentUser.id, data: updateData }));
          updateCacheFrequencies("todo")
          break;
        }
        case 403:{
            alert(`Forbidden`)
            break;
        }
        case 400:{
            alert(`Invalid record`)
            break;
        }
        default:{
          alert('Fail to update')
      }
    }
})
.catch (error=> alert(`Fail to update: ${error.massage}`));
  }

  return (
    <>
      <form onSubmit={(e) => handleTodoUpdate(e)}>
        <span>
          <input type="checkbox" name="completed" defaultChecked={todo.completed} />
        </span>
        <input type="text" name="title" defaultValue={todo.title} />
        <input type="submit" value="update" />
      </form>
    </>
  );
};

export default UpdateTodo;
