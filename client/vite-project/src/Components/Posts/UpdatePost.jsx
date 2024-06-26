import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { userContext } from "../../App";
import { cacheContext } from "../../App";
import Cookies from 'js-cookie';

const UpdatePost = (props) => {
  const { post, setInEditing, setPostsArr } = props;
  const { cacheGet, updateCacheFrequencies } = useContext(cacheContext);
  const { currentUser, setCurrentUser } = useContext(userContext);

  async function handlePostUpdate(event) {
    event.preventDefault();
    post.title = event.target.title.value;
    post.body = event.target.body.value;
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': Cookies.get('token')
      },
    })
      .then(response => {
        switch (response.status) {
          case 204: {
            let updateData;
            setInEditing(-1);
            setPostsArr(prevArr => {
              updateData = prevArr.map(el => el.id === post.id ? post : el);
              return updateData;
            });
            localStorage.setItem("posts", JSON.stringify({ user: currentUser.id, data: updateData }))
            updateCacheFrequencies("posts");
            break;
          }
          case 403: {
            alert(`Forbidden`)
            break;
          }
          case 400: {
            alert(`Invalid record`)
            break;
          }
          default:{
            alert('Fail to update')
        }
        }
      })
      .catch(error => alert(`Fail to update: ${error.massage}`));
  }

  return (
    <>
      <form onSubmit={(e) => handlePostUpdate(e)}>
        <input type="text" name="title" defaultValue={post.title} ></input>
        <span><input type="text" name="body" defaultValue={post.body} /></span>
        <input type="submit" value="update"></input>
      </form>
    </>
  );
}
export default UpdatePost
