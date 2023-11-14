import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import "../App.css";
import "./Details.css";

const Details = () => {
  const { index } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [comments, setComments] = useState([]);
  const [createdComment, setCreatedComment] = useState("");
  const [numLikes, setLikes] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedData = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .eq("id", index)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }

      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setComments(data.comments);
        setLikes(data.likes);
      }
    };
    fetchedData();
  }, [index, navigate]);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("Posts")
      .delete()
      .eq("id", index)
      .select();

    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Posts")
      .update({ comments: [createdComment, ...comments] })
      .eq("id", index);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
    setComments([createdComment, ...comments]);
  };

  const updateCount = async (e) => {
    e.preventDefault();
    await supabase
      .from("Posts")
      .update({ likes: numLikes + 1 })
      .eq("id", index);

    setLikes((numLikes) => numLikes + 1);
  };

  const removeCount = async (e) => {
    e.preventDefault();
    await supabase
      .from("Posts")
      .update({ likes: numLikes - 1 })
      .eq("id", index);

    setLikes((numLikes) => numLikes - 1);
  };

  const handleEdits = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Posts")
      .update({ title, image, description })
      .eq("id", index)
      .select();

    console.log(index, title);
  };

  const switcher = async (e) => {
    setIsEditing(!isEditing);
  };
  return (
    <>
      <div className="main_container">
        <div className="likes">
          <button className="like" onClick={updateCount}>
            🠉
          </button>
          <p>{numLikes}</p>
          <button className="dislike" onClick={removeCount}>
            🠋
          </button>
        </div>
        <div className="details_container">
          <div className="edit_section">
            <div className="edit_form">
              <button className="edit" onClick={switcher}>
                ☰
              </button>
              {isEditing && (
                <form onSubmit={handleEdits}>
                  <h2>Title:</h2>
                  <input
                    type="text"
                    value={title}
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <h2>Image:</h2>
                  <input
                    type="text"
                    value={image}
                    id="image"
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <h2>Description:</h2>
                  <input
                    type="text"
                    value={description}
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <br/>
                  <button>Update</button>
                </form>
              )}
            </div>
          </div>

          <div className="details">
            <h1>{title}</h1>
            {image && <img className="image" src={image} alt="" />}
            <h2>{description}</h2>
          </div>
          <div className="comments">
            <form className="comment_area" onSubmit={handleSubmit}>
              <h2>Comment:</h2>
              <textarea
                placeholder="What are your thoughts?"
                type="text"
                value={createdComment}
                id="comment"
                onChange={(e) => setCreatedComment(e.target.value)}
              />
              <div className="comment_button">
                <button className="commented_button">Comment</button>
              </div>
            </form>
            <div className="comment_section">
              {comments.length == 0 ? (
                <p>No comments</p>
              ) : (
                comments.map((comment, i) => (
                  <p className="commented" key={i}>
                    {comment}
                  </p>
                ))
              )}
            </div>

            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
