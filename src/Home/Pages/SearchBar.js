import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getTracks } from "../Utils/configSpotifiy";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css"

const SearchBar = ({ searchResult }) => {
  const token = useSelector((state) => state.auth.token);

  const [text, setText] = useState("");

  const handleInput = (e) => {
    setText(e.target.value);
  };
  const searchTracks = async (e) => {
    e.preventDefault();

    try {
      const data = await getTracks(text, token);
      const tracks = data.tracks.items;
      searchResult(tracks);
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={searchTracks}>
        <input onChange={handleInput} className="search" type="text" placeholder="Search Track"></input>
        <button className="btn-submit">Submit</button>
      </form>
    </>
  );
};

export default SearchBar;