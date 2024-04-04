import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import PostDetails from "../Posts/PostDetails";
import { userContext } from "../../App";
import UpdateComment from "./UpdateComment";
import Popup from "reactjs-popup";
import { FiPlusCircle } from "react-icons/fi";
import AddComment from "./AddComment";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import style from "./Comments.module.css";
import { cacheContext } from "../../App";
import Cookies from 'js-cookie';

const Comments = () => {
    const location = useLocation();
    const { postId } = location.state;
    const [inEditingCommentId, setInEditingCommentId] = useState(-1);
    const { currentUser, setCurrentUser } = useContext(userContext);
    const { cacheGet, updateCacheFrequencies } = useContext(cacheContext);
    const [commentsArr, setCommentsArr] = useState(cacheGet(`${postId}comments`)||[]);


    useEffect(() => {
        const fetchComments = async () => {
            console.log("fetch comments")
            fetch(`http://localhost:3000/comments?postId=${postId}`, {
                headers: {
                    'Authorization': Cookies.get('token')
                },
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem(`${postId}comments`, JSON.stringify({ user: currentUser.id, data: data }));
                    updateCacheFrequencies(`${postId}comments`);
                    setCommentsArr(data);
                })
                .catch(error =>
                    console.error(error));
        };
        if (!commentsArr.length)
            fetchComments();
    }, [postId]);

    function handleDeleteComment(id) {
        setCommentsArr((prevComments) => prevComments.filter((comment) => comment.id !== id));
        fetch(`http://localhost:3000/comments/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': Cookies.get('token')
            },
        })
            .then(response => {
                if (response.ok) {
                    const updataData = commentsArr.filter(comment => comment.id != id);
                    localStorage.setItem(`${postId}comments`, JSON.stringify({ user: currentUser.id, data: updataData }))
                    updateCacheFrequencies(`${postId}comments`);
                    setCommentsArr(updataData);
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <div>
                <Popup trigger=
                    {<div className="addBtn" >add comment<FiPlusCircle /></div>}
                    position="center center"
                    closeOnDocumentClick>

                    {close => (
                        <div className="popupContainer">
                            <AddComment postId={postId} setCommentsArr={setCommentsArr} closePopUp={close} />

                        </div>
                    )}

                </Popup>
            </div>
            <div>
                {commentsArr.map((comment) => (
                    <div key={comment.id} className={style.commentDetails}>
                        {inEditingCommentId !== comment.id ? (
                            <>
                                <div>
                                    <b>{comment.name}</b>
                                </div>
                                <div>{comment.body}</div>
                                {comment.email === currentUser.email && (
                                    <>
                                        <span onClick={() => handleDeleteComment(comment.id)}>
                                            <RiDeleteBin7Fill />
                                        </span>
                                        <span onClick={() => setInEditingCommentId(comment.id)}>
                                            <MdOutlineEdit />
                                        </span>
                                    </>
                                )}
                            </>
                        ) : (
                            <UpdateComment comment={comment} setInEditing={setInEditingCommentId} commentsAr={commentsArr} setCommentsArr={setCommentsArr} />
                        )}
                    </div>

                ))}
            </div>
        </>
    );
};

export default Comments;
