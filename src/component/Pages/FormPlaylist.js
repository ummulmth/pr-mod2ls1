import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import config from "./config";
import axios from "axios";

const FormPlaylist = ({ token, userId, uri }) => {
    const [text, setText] = useState({
        title: "",
        description: "",
    })

    const [error, setError] = useState({
        title: "",
    })

    const handleInput = (e) => {
        const { name, value } = e.target;

        setText({ ...text, [name]: value })
        setError({ ...error, [name]: "" })

    }
    console.log(error)

    const formValidation = () => {
        let isValid = true;

        if (text.title.length < 5) {
            setError({ ...error, title: "Title minimum length is 5 characters" })
            isValid = false;
        }

        return isValid;

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
            `${config.SPOTIFY_API_URL}/playlists/${playlistId}/tracks`,
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

    const handleSubmit = async (e) => {
        e.prevenDefault();
        if (formValidation()) {
            if (uri.length > 0) {
                try {
                    const response = await createPlaylist(
                        token,
                        userId,
                        { name: text.title, description: text.description }
                    );

                    await addTracksToPlaylist(
                        token,
                        response.id,
                        uri,
                    );

                    toast.success("Playlist has been created");
                    console.log("SUCCESS")
                    setText({
                        title: "",
                        description: "",
                    })
                } catch (error) {
                    toast.error(error);
                    console.log("ADADADADAD")
                }
            } else {
                toast.error("Please select a track")
                console.log("ERROR")
            }
        }
    }

    return (
        <>  
            <ToastContainer />
            <form className="form-playlist" onSubmit={handleSubmit}>
                <label htmlFor="title">Playlist Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Title"
                    error={error.title}
                    onChange={handleInput}
                    required
                />
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    type="textarea"
                    name="description"
                    placeholder="Description"
                    onChange={handleInput}
                    required
                />
                <button className="btn-submit">Submit</button>
            </form>
        </>
    )
}

export default FormPlaylist;