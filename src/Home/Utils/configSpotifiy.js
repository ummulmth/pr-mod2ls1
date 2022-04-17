import config from "../Pages/config";
import axios from "axios";

const getTracks = async (text, token) => {
    const response = await axios.get(
        `${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}&limit=10`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }   
        }
    )
    return response.data;
}

const getProfile = async (token)=> {
    const response = await axios.get(
        `${config.SPOTIFY_BASE_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    )
    return response.data;
}

const createPlaylist = async (token, userId, {name, description}) => {
    const response = await axios.post(
        `${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`,
        JSON.stringify({name, description, public: false, collaborative: false}),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    )
    console.log(response.data)
    return response.data;
}

const addTracksToPlaylist = async (token, playlistId, uris) => {
    const response = await axios.post(
        `${config.SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
        JSON.stringify({uris}),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }

    )
    console.log(response.data)
    return response.data;
}
export {getTracks, getProfile, createPlaylist, addTracksToPlaylist}; 