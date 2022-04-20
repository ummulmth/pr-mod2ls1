import React, { useState, ChangeEventHandler, FormEventHandler } from "react";
import { getTracks } from "../Utils/configSpotifiy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useSelectorType } from "../../store";
import { ResponseTracks, Track } from "../../types/track";

interface Props {
  searchResult: (tracks: Track[]) => void;
}

const Search: React.FC<Props> = ({ searchResult }) => {
  const token: string = useSelectorType((state) => state.auth.token);

  const [text, setText] = useState<string>("");

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  const searchTracks: FormEventHandler<HTMLDivElement> &
    FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const data: ResponseTracks = await getTracks(text, token);
      const tracks: Track[] = data.tracks.items;
      searchResult(tracks);
    } catch (e) {
      toast.error("ERROR WHEN GETTING TRACKS");
    }
  };
  return (
    <>
      <ToastContainer />
      <form onsubmit={searchTracks}>
        <input
          onChange={handleInput}
          className="search"
          type="text"
          placeholder="Search Track"
        ></input>
        <button className="btn-submit">Submit</button>
      </form>
    </>
  );
};

export default Search;
