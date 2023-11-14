import { useState } from "react";
import React from "react";
import { supabase } from "../client";
import "../App.css";

const Createpost = () => {
  const [post, setPost] = useState({
    title: "",
    image: "",
    description: "",
    likes: 0,
    comments: [],
  });
  const createPost = async (event) => {
    event.preventDefault();
    const { error } = await supabase
      .from("Posts")
      .insert({
        title: post.title,
        image: post.image,
        description: post.description,
        likes: post.likes,
        comments: post.comments,
      })
      .select();
    if (error) {
      console.log(error);
    }
    window.location = "/";
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <div className="container_create">
        <div className="form">
          <h1>Create a post</h1>
          <form>
            <label>Title</label> <br />
            <input className="box"
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
            />
            <br />
            <label>Image</label> <br />
            <input
            className="box"
              type="text"
              id="image"
              name="image"
              value={post.image}
              onChange={handleChange}
            />
            <br />
            <label>Description</label>
            <br />
            <textarea
              name="description"
              rows="5"
              cols="50"
              id="description"
              value={post.description}
              onChange={handleChange}
            ></textarea>
            <br />
            <input type="submit" value="Submit" onClick={createPost} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Createpost;
