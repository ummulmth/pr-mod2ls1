import React, { useEffect, useState} from "react";
import Track from "../Song/Track";
import config from "./config";
import SearchBar from "./SearchBar";

function LandingPage () {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);

  useEffect(() => {
    const accessToken = new URLSearchParams(window.location.hash).get('#access_token');

    setAccessToken(accessToken);
    setIsAuthorize(accessToken !== null);
  }, []);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000/callback/&state=${state}&scope=${config.SCOPE}`;
  }

  const filterSelectedTracks = () => {
    return tracks.filter(track => selectedTracksUri.includes(track.uri));
  }

  const onSuccessSearch = (searchTracks) => {
    const selectedTracks = filterSelectedTracks();
    const searchDistincTracks = searchTracks.filter(track => !selectedTracksUri.includes(track.uri));

    setTracks([...selectedTracks, ...searchDistincTracks]);
  }

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter(item => item !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
    }
  }

  return (
      <div className="container">
          {!isAuthorize && (
            <a href={getSpotifyLinkAuthorize()}>Login</a>
          )}

          {isAuthorize && (
            <SearchBar
              accessToken={accessToken}
              onSuccess={(tracks) => onSuccessSearch(tracks)}
            />
          )}

          <div className="playlist-content">
            {tracks.length === 0 && (
                  <p>No tracks</p>
                )}
            <div className="playlist-tracks">
              {tracks.map((track) => (
                <Track
                  key={track.id}
                  imageUrl={track.album.images[1].url}
                  title={track.name}
                  artist={track.artists[0].name}
                  toggleSelect={() => toggleSelect(track)}
                />
              ))}
            </div>
          </div>

      </div>
       );
    
      }
export default LandingPage;
