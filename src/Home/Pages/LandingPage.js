import React, { useEffect, useState } from "react";
import "../../styles/styles.css";
import Track from "../Utils/Track";
import config from "./config";
import SearchBar from "./SearchBar";
import FormPlaylist from "../Utils/FormPlaylist";
import { toast } from "react-toastify";
import { getProfile } from "../Utils/configSpotifiy";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../sliceAcc/sliceAcc";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"

const LandingPage = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTrackUri, setSelectedTrackUri] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState([]);

  const isLogin = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const access_token = new URLSearchParams(window.location.hash).get(
      "#access_token"
    );

    if (access_token !== null) {
      const userProfile = async () => {
        try {
          const response = await getProfile(access_token);
          dispatch(
            login({
              token: access_token,
              user: response,
            })
          );
        } catch (e) {
          toast.error(e);
        }
      };

      userProfile();
    }
  }, []);

  const authorization = () => {
    return `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000/callback/&response_type=token&scope=${config.SCOPE}`;
  };
  const searchResultSuccess = (data) => {
    const selectedTracks = data.filter((track) =>
      selectedTrackUri.includes(track.uri)
    );

    setTracks([...new Set([...selectedTracks, ...data])]);
  };

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTrackUri.includes(uri)) {
      setSelectedTrackUri(selectedTrackUri.filter((item) => item !== uri));
      setSelectedTrack(selectedTrack.filter((item) => item.uri !== uri));
    } else {
      setSelectedTrackUri([...selectedTrackUri, uri]);
      setSelectedTrack([...selectedTrack, track]);
    }
  };
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {!isLogin && (
              <div className="login-container">
                <h2>Please Login</h2>
                <a href={authorization()}>Login</a>
              </div>
            )}

            {isLogin && <Redirect to="/CreatePlaylist"></Redirect>}
          </Route>
          <Route path="/CreatePlaylist">
            <div className="home-container">
              <div className="button-container">
                <h3>Search Track Here</h3>
                <div>
                  <SearchBar
                    searchResult={(tracks) => searchResultSuccess(tracks)}
                  />
                </div>
                {tracks.length > 0 && (
                  <div className="playlist-container">
                    <h2>Create Playlist</h2>
                    <FormPlaylist uri={selectedTrackUri} />
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
                        select={selectedTrackUri.includes(e.uri)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default LandingPage;
