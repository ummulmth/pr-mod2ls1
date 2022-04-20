import config from "../Pages/config";
import axios, {AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse} from "axios";
import { ResponseTracks } from "../../types/track";
import { Playlist } from "../../types/Playlist";
import {User}



export interface Snapshot {
    snapshot_id: string;
  }

type typeRequestHeaders = (token: string) => AxiosRequestHeaders;

const requestHeaders: typeRequestHeaders = (token) => {
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    }
}


type typeGetTracks = (text: string, token: string) => Promise<ResponseTracks>

const getTracks: typeGetTracks =  async (text, token) => {
    const headersOption: AxiosRequestConfig<any> = {
        headers: requestHeaders(token),
    }

    const response: AxiosResponse = await axios.get(
        `${config.SPOTIFY_API_URL}/search?type=track&q=${text}&limit=16`, headersOption
    )
    return response.data;
}


type typeGetProfile = (token: string) => Promise<User>;

const getProfile: typeGetProfile = async (token)=> {
    const headersOption: AxiosRequestConfig<any> = {
        headers: requestHeaders(token),
    }

    const response:AxiosResponse = await axios.get(
        `${config.SPOTIFY_API_URL}/me`, headersOption
    )
    return response.data;
}


interface PropsPlaylist {name: string; description:string}

type typeCreatePlaylist = (token: string, userId: string, playlist: PropsPlaylist ) => Promise<Playlist>

const createPlaylist: typeCreatePlaylist = async (token, userId, {name, description}) => {
    const headersOption: AxiosRequestConfig<any> = {
        headers: requestHeaders(token),
    }
    const response = await axios.post(
        `${config.SPOTIFY_API_URL}/users/${userId}/playlists`,
        JSON.stringify({name, description, public: false, collaborative: false}),
        headersOption
    )
    return response.data;
}

type typeAddTracksToPlaylist = (token: string, playlistId: string, uris:string) => Promise<Snapshot>

const addTracksToPlaylist:typeAddTracksToPlaylist = async (token, playlistId, uris) => {

    const headersOption: AxiosRequestConfig<any> = {
        headers: requestHeaders(token),
    }

    const response = await axios.post(
        `${config.SPOTIFY_API_URL}/playlists/${playlistId}/tracks`,
        JSON.stringify({uris}),
        headersOption
    )
    console.log(response.data)
    return response.data;
}
export {getTracks, getProfile, createPlaylist, addTracksToPlaylist}; 