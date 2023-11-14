import "./App.css";
import React, { useState, useEffect, useReducer } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Createpost from "./Pages/Createpost";
import ReadPosts from "./Pages/ReadPosts";
import { Link } from "react-router-dom";
import { supabase } from "./client";
import Card from "./components/Card";
import Details from "./Pages/Details";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import LikedPosts from "./Pages/LikedPosts";
import DatePosts from "./Pages/DatePosts";
import league from "./assets/league.png";
import SearchList from "./Pages/SearchList";

function App() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState(null);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [number, setNumber] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("Posts").select();

      if (error) {
        console.log("ERROR");
        setPosts(null);
      }
      if (data && !query) {
        setPosts(data);
      }
    };

    fetchData();
  }, [posts]);

  const querying = async (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  useEffect(() => {
    setSearch(query);
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (search != "") {
      navigate(`/search/${search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="App">
        <div className="header">
          <h1 className="home">
            <Link className="Link" to="/">
              <img className="logo" src="https://i.imgur.com/hIhZt6b.png"></img>
            </Link>
            <Link className="Link" to="/">
              oL Forums
            </Link>
          </h1>
          <form onSubmit={onSubmit}>
            <input className="searchbar" type="text" onChange={querying} />
            <button className="submit_button">Submit</button>
          </form>
          <Link to="/new">
            <button className="headerBtn"> Create </button>
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<ReadPosts />} />
        <Route path="/liked" element={<LikedPosts />} />
        <Route path="/recent" element={<DatePosts />} />
        <Route path="/new" element={<Createpost />} />
        <Route path="/search">
          <Route path=":search" element={<SearchList query={search} />}></Route>
        </Route>
        <Route path="/details">
          <Route path=":index" element={<Details />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
