import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  Link,
} from "react-router-dom";
import { supabase } from "../client";
import "../App.css";

const ReadPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Posts").select();

      if (error) {
        console.log("ERROR");
        setPosts(null);
      }
      if (data) {
        setPosts(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="ReadPosts">
      <div className="links">
        <Link className="direct" to={`/Liked`}>
          MostLiked
        </Link>
        <Link className="direct" to={`/recent`}>
          Recent
        </Link>
      </div>

      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <Card
            key={index}
            id={post.id}
            title={post.title}
            image={post.image}
            created_at={post.created_at}
            description={post.description}
            likes={post.likes}
            comments={post.comments}
          />
        ))
      ) : (
        <h1>Nothing</h1>
      )}
    </div>
  );
};

export default ReadPosts;
