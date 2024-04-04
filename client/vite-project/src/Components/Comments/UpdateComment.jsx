import React, { useContext } from "react";
import { cacheContext, userContext } from "../../App";
import Cookies from 'js-cookie';


const UpdateComment = (props) => {
    const { comment, setInEditing, commentsArr, setCommentsArr } = props;
    const { currentUser, setCurrentUser } = useContext(userContext);
    const { cacheGet, updateCacheFrequencies } = useContext(cacheContext);

    async function handleCommentUpdate(event) {
        event.preventDefault();

        comment.body = event.target.body.value;

        fetch(`http://localhost:3000/comments/${comment.id}`, {
            method: 'PUT',
            body: JSON.stringify(comment),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': Cookies.get('token')
            },
        })
            .then(response => {
                switch (response.status) {
                    case 204: {
                        setInEditing(-1);
                        let updateData;
                        setCommentsArr(prev => {
                            updateData = prev.map(el => (el.id === comment.id ? comment : el));
                            return updateData;
                        });
                        localStorage.setItem("comments", JSON.stringify({ user: currentUser.id, data: updateData }));
                        updateCacheFrequencies("comments")
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
            <form onSubmit={(e) => handleCommentUpdate(e)}>
                <input type="text" name="body" defaultValue={comment.body} />
                <input type="submit" value="Update" />
            </form>
        </>
    );
};

export default UpdateComment;
