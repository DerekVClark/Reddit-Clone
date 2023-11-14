import React, { useEffect } from "react";
import { useState } from "react";
import "./Card.css";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import { GoTrueClient } from "@supabase/supabase-js";

const Card = (props) => {
  const [posts, setPosts] = useState(props);
  const [numLikes, setLikes] = useState(props.likes);
  const [removeLike, setRemoveLike] = useState(props.likes);
  const [numberComments, setNumberComments] = useState(props.comments.length);
  const navigate = useNavigate();

  const updateCount = async (e) => {
    e.preventDefault();
    await supabase
      .from("Posts")
      .update({ likes: numLikes + 1 })
      .eq("id", props.id);

    setLikes((numLikes) => numLikes + 1);
  };

  const removeCount = async (e) => {
    e.preventDefault();
    await supabase
      .from("Posts")
      .update({ likes: numLikes - 1 })
      .eq("id", props.id);

    setLikes((numLikes) => numLikes - 1);
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .delete()
      .eq("id", props.id)
      .select();
  };

  function validateUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    <>
      <Link className="page_link" to={`/details/${props.id}`}>
        <div className="Card">
          <div className="likes">
            <button className="like" onClick={updateCount}>
              🠉
            </button>
            <p>{numLikes}</p>
            <button className="dislike" onClick={removeCount}>
              🠋
            </button>
          </div>

          <div className="sections">
            <div className="card_content">
              
              <h2 className="title">{props.title}</h2>
              <h3 className="data">{props.created_at.substring(0, 8)}</h3>
              {validateUrl(props.image) == true ? (
                <img
                  onClick={(e) => e}
                  className="post_img"
                  src={props.image}
                ></img>
              ) : (
                <p></p>
              )}
            </div>

            <div className="card_buttons">
              <button className="comment">
                💬{props.comments && numberComments == 0 ? 0 : numberComments}{" "}
                Comments
              </button>

              <button className="delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
