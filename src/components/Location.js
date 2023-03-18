import { useLocation } from "react-router-dom";

import Map from "./Map";

import styles from "../styles/location.module.css";
import { useSelector } from "react-redux";
import { apiUrl, authenticatedFetch } from "../helpers";
import { useEffect, useState } from "react";

const Location = () => {
  const { isLoggedIn, userId } = useSelector(state => state.auth);

  const { state } = useLocation();
  const { title, description, imageLink, loc, _id } = state;

  const [comment, setComment] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    authenticatedFetch(`${apiUrl}/locations/${_id}/comments`)
      .then(response => response.json())
      .then(json => {
        setComments(json.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1)));
      });
  }, [refetch, _id]);

  const leaveComment = async content => {
    const response = await authenticatedFetch(`${apiUrl}/locations/${_id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    const json = await response.json();
    return json;
  };

  const deleteComment = async commentId => {
    const response = await authenticatedFetch(`${apiUrl}/locations/${_id}/comments/${commentId}`, {
      method: "DELETE",
    });
    const json = await response.json();

    if ("errors" in json) {
      throw new Error(json.errors[0]);
    }

    return json;
  };

  const onLeaveCommentPressed = () => {
    setLoading(true);
    leaveComment(comment).finally(() => {
      setLoading(false);
      setRefetch(old => old + 1);
    });
  };

  const onDeleteCommentPressed = (event, commentId) => {
    event.preventDefault();

    setLoading(true);
    deleteComment(commentId).finally(() => {
      setLoading(false);
      setRefetch(old => old + 1);
    });
  };

  return (
    <>
      <div className={styles.location}>
        <h2>{title}</h2>
        <p>{description}</p>
        <img src={imageLink} alt={title} />
      </div>

      <Map coords={loc} name={title} />

      {isLoggedIn && (
        <>
          <textarea onChange={({ target: { value } }) => setComment(value)} disabled={isLoading}>
            {comment}
          </textarea>
          <br />
          <button onClick={onLeaveCommentPressed} disabled={isLoading}>
            Post Comment
          </button>
          <br />
          {comments.map(comment => (
            <>
              <hr />
              <p>{comment.content}</p>
              {userId === comment.ownerUser && (
                <a href="#" onClick={event => onDeleteCommentPressed(event, comment._id)} disabled={isLoading}>
                  Delete Comment
                </a>
              )}
            </>
          ))}
        </>
      )}
    </>
  );
};

export default Location;

