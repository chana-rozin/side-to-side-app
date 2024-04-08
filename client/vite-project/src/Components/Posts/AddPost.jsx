import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import { cacheContext } from "../../App";
import Cookies from 'js-cookie';

const AddPost = (props) => {

    const { setPostsArr, closePopUp } = props;
    const { currentUser } = useContext(userContext);
    const { updateCacheFrequencies } = useContext(cacheContext);
    const [error, setError] = useState(false)
    const userId = currentUser.id;

    const post = {
        "userId": "0",
        "id": "0",
        "title": "",
        "body": ""
    }

    async function handleAddBtn(event) {
        event.preventDefault();
        post.userId = userId;
        post.title = event.target.title.value;
        post.body = event.target.body.value;
        addPost();
        closePopUp();
    }

    async function addPost() {
        console.log(post)
        await fetch("http://localhost:3000/posts", {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': Cookies.get('token'),
            },
        })
            .then(async (respons) => {
                switch (respons.status) {
                    case 201: {
                        let updateData;
                        const resBody = await respons.json()
                        console.log(resBody.insertId)
                        post.id = resBody.insertId
                        setPostsArr(prevArr => {
                            updateData = [...prevArr, post];
                            return updateData
                        });
                        localStorage.setItem("posts", JSON.stringify({ user: currentUser.id, data: updateData }))
                        updateCacheFrequencies("posts");
                    }
                    case 403:{
                        alert(`Forbidden`)
                    }
                    case 400:{
                        alert(`Invalid record`)
                    }
                    default:{
                        alert('Fail to add')
                    }
                }
        })
        .catch (error=> alert(`Fail to add: ${error.massage}`));
    }

return (
    <><div className="container">
        <p>add your post:</p>
        <form onSubmit={handleAddBtn}>
            <input placeholder="your post title:" type="text" name="title"></input>
            <textarea name="body" placeholder="your post body:"></textarea>
            <input type="submit" value="Add"></input>
        </form>
    </div>
    </>
)
}


export default AddPost;