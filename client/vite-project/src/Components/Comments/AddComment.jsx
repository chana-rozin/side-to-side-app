import React, { useContext } from "react";
import { userContext } from "../../App";
import { cacheContext } from "../../App";
import Cookies from 'js-cookie';

const AddComment = (props) => {
    const { postId, setCommentsArr, closePopUp } = props;
    const { currentUser } = useContext(userContext);
    const { updateCacheFrequencies } = useContext(cacheContext);

    const comment = {
        postId: postId,
        id: "",
        name: "",
        email: currentUser.email,
        body: "",
    };

    async function handleAddBtn(event) {
        event.preventDefault();
        comment.name = event.target.name.value,
            comment.body = event.target.body.value,
            addComment();
        closePopUp();
    }

    async function addComment() {
        await fetch("http://localhost:3000/comments", {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': Cookies.get('token')
            },
        })
            .then(async (respons) => {
                switch (respons.status) {
                    case 201: {
                        let updateData;
                        const resBody = await respons.json();
                        comment.id = resBody.insertId;
                        setCommentsArr((prevArr) => {
                            updateData = [...prevArr, comment];
                            return updateData;
                        });
                        localStorage.setItem("comments", JSON.stringify({ user: currentUser.id, data: updateData }))
                        updateCacheFrequencies("comments");
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
                        alert('Fail to add')
                    }
                }
        })
        .catch (error=> alert(`Fail to add: ${error.massage}`));
    }

    return (
        <>
            <div className="container">
                <p>Add your comment:</p>
                <form onSubmit={handleAddBtn}>
                    <input placeholder="Name" type="text" name="name" required></input>
                    <textarea name="body" placeholder="Your text here" required></textarea>
                    <input type="submit" value="Add"></input>
                </form>
            </div>
        </>
    );
};

export default AddComment;
