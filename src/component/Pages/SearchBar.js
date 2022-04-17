import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getTracks } from "../Utils/configSpotifiy";

const SearchBar = ({ token, searchResult }) => {
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
    <div>
      <ToastContainer />
      <form onSubmit={searchTracks}>
        <input onChange={handleInput} className="form-search" type="text" placeholder="Search Track Here..."></input>
        <button className="btn-submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchBar;
