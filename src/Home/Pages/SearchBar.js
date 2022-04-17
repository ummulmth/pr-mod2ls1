import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getTracks } from "../Utils/configSpotifiy";
import { useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
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
        <TextField
          onChange={handleInput}
          id="outlined-basic"
          variant="standard"
        />
        <Button variant="contained" color="success">
          Success
        </Button>
      </form>
    </>
  );
};

export default SearchBar;