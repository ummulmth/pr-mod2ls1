import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { addTracksToPlaylist, createPlaylist } from "./configSpotifiy";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css"

const FormPlaylist = ({ uri }) => {
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.user.id);

    
    const [text, setText] = useState({
        title: "",
        description: "",
    })


    const handleInput = (e) => {
        const { name, value } = e.target;

        setText({ ...text, [name]: value })

    }

    console.log(text)


    const formValidation = () => {
        let isValid = true;

        if (text.title.length <= 12) {
            isValid = false;
        }

        return isValid;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValidation()) {
            if (uri.length > 0) {
                try {
                    const response = await createPlaylist(token, userId, { 
                        name: text.title, 
                        description: text.description 
                    });
                    await addTracksToPlaylist(
                        token,
                        response.id,
                        uri,
                    );
                    toast.success("Playlist has been created");
                    setText({
                        title: "",
                        description: "",
                    })
                } catch (e) {
                    toast.error(e);
                }
            } else {
                toast.error("Please select a track")
            }
        } else {
            toast.error("Atleast tittle length is 5")
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