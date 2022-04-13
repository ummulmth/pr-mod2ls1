import React from "react";
import { Component } from "react";
import Track from "../Song/Track";
import SearchBar from "../Search/SearchBar";
// import config from "./config/config";

class Pages extends Component {
    client_id = process.env.REACT_APP_CLIENT_ID;
    BASE_URL = 'https://accounts.spotify.com/authorize';
    response_type = "token";
    SCOPE = "playlist-modify-private"
    redirect_uri = "http://localhost:3000/callback/"
    auth = `${this.BASE_URL}?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=${this.response_type}&scope=${this.SCOPE}`

    hash = window.location.hash;
    token = this.hash.split("&")[0].split('=')[1]

    state = {
        tracks: [],
        text: "",
        token: this.token
    }
    getTracks = async (e) => {
        e.preventDefault()
        const tracks = await fetch(
            `https://api.spotify.com/v1/search?q=${this.state.text}&type=track&limit=8`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }
        ).then((response) => response.json());
        this.setState({ tracks: tracks.tracks.items })
        console.log(tracks.tracks.items)
    }

    // handleInput = (e) => {
    //     this.setState({ text: e.target.value })
    // }

    logOut = () => {
        this.setState({token: ""})
    } 
    render() {
        return (
            <div >
                {!this.state.token ?
                    <div className="button-container">
                        <a href={this.auth}>Login</a>
                    </div>

                    : <div className="button-container"> <a onClick={this.logOut}>Logout</a> </div>}

                {this.state.token ?
                    <div>
                        <div className="btn-container">
                        <h3>Search Track Here</h3>
                        <form onSubmit={this.getTracks}>
                            <SearchBar />
                        </form>
                            
                        </div>
                        <div className="container" >
                            {this.state.tracks.map(e => (
                            <Track url={e.album.images[1].url} title={e.name} artist={e.artists[0].name} />    
                            ))}
                        </div>
                    </div>
                            : <div className="button-container"><h2>Please Login</h2></div>}
                </div>
    
            )
        }
           


// this line didn't work, i'm confused the result always INVALID_CLIENT: Invalid client :)
    // state = {
    //     tracks: [],
    //     accessToken: '',
    //     isAuthorize: false,
    //   }
    
    //   getHashParams() {
    //     const hashParams = {};
    //     const r = /([^&;=]+)=?([^&;]*)/g;
    //     const q = window.location.hash.substring(1);
    //     let e = r.exec(q);
    //     while (e) {
    //       hashParams[e[1]] = decodeURIComponent(e[2]);
    //       e = r.exec(q);
    //     }
    //     return hashParams;
    //   }

    //   componentDidMount() {
    //     const params = this.getHashParams();
    //     // const access_token = params.access_token;
    //     const { access_token: accessToken } = params;
    //     this.setState({ accessToken, isAuthorize: accessToken !== undefined });
    //   };
    
    //   getSpotifyLinkAuthorize() {
    //     //console.log(process.env)  
    //     const state = Date.now().toString();
    //     const clientId = process.env.REACT_APP_CLIENT_ID;
    //     return `${config.SPOTIFY_BASE_URL}/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000/callback&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    //   }
    
    //   onSuccessSearch(tracks) {
    //     this.setState({tracks});
    //   }

    //   render() {
    //     return (
    //         <div className="pages-container">
    //           {!this.state.isAuthorize && (
    //             <a href={this.getSpotifyLinkAuthorize()}>Authorize</a>
    //           )}
    
    //           {this.state.isAuthorize && (
    //             <SearchBar
    //               accessToken={this.state.accessToken}
    //               onSuccess={(tracks) => this.onSuccessSearch(tracks)}
    //             />
    //           )}
    //            {this.state.tracks.length === 0 && (
    //                 <p>No tracks</p>
    //               )}
    //         {this.state.tracks.map((song) => (
    //             <Track
    //             image={song.album.images[0].url}
    //             songTitle={song.songTitle}
    //             albumName={song.album.name}
    //             artists={song.artists[0].name}
    //           /> 
    //         ))}
    
    //     </div>
    //     )}
}

export default Pages;