import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import config from "./config";

function SearchBar({ accessToken, onSuccess }) {
  const [text, setText] = useState('');

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
        .then((data) => data.json());

      const tracks = response.tracks.items;
      onSuccess(tracks);
    } catch (e) {
      alert(e);
    }
  }
  
    return (
      <div>
        <ToastContainer />
        <form className="form-search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            className="form-search_input"
            required
            value={text}
            onChange={handleInput}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
  
  export default SearchBar; 