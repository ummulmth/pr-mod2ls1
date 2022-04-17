import React, { useEffect, useState } from "react";
import '../../styles/styles.css'
import Track from "../Utils/Track";
import config from "./config";
import SearchBar from "./SearchBar";
import FormPlaylist from "../Utils/FormPlaylist";
import { ToastContainer, toast } from "react-toastify";
import { getProfile } from "../Utils/configSpotifiy";

const LandingPage = () => {
  const [token, setToken] = useState(""); //token
  const [isAuthorize, setIsAuthorize] = useState(false); //login
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [user, setUser] = useState({});


  useEffect(() => {
    const token = new URLSearchParams(window.location.hash).get(
      "#access_token"
    );

    if (token !== null) {
      setToken(token);
      setIsAuthorize(token !== null);

      const userProfile = async () => {
        try {
          const response = await getProfile(token);
          setUser(response);
        } catch (e) {
          toast.error(e);
        }
      };

      userProfile();
    }
  }, []);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000/callback/&state=${state}&scope=${config.SCOPE}`;
  };

  const searchResultSuccess = (data) => {
    const selectedTracks = data.filter((track) =>
      selectedTracksUri.includes(track.uri)
    );
    setTracks([...new Set([...selectedTracks, ...data])]);
  };

  const toggleSelect = (track) => {
    const uri = track.uri;
    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  };
  const logOut = () => {
    setToken("");
    setIsAuthorize(false);
  };

  console.log(selectedTracksUri);

  return (
    <div>
      <ToastContainer />
      {!isAuthorize && (
        <div className="login-container">
          <h2>Please Login</h2>
          <a href={getSpotifyLinkAuthorize()}>Login</a>
        </div>
      )}
      {isAuthorize && (
        <div className="home-container">
          <div className="btn-container">
            <button href="#" onClick={logOut}>Log Out</button>
            <h3>Search Track</h3>
            <div>
              <SearchBar
                token={token}
                searchResult={(tracks) => searchResultSuccess(tracks)}
              />
            </div>
            {tracks.length > 0 && (
              <div className="playlist-container">
                <h2>Create Playlist</h2>
                <FormPlaylist
                  token={token}
                  userId={user.id}
                  uri={selectedTracksUri}
                />
              </div>
            )}
          </div>
          <div className="container">
            {tracks.map((e) => (
              <div className="wrapper">
                <div className="title-container">
                  <Track
                    key={e.uri}
                    url={e.album.images[1].url}
                    title={e.name}
                    artist={e.artists[0].name}
                    toggleSelect={() => toggleSelect(e)}
                    select={selectedTracksUri.includes(e.uri)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default LandingPage;
