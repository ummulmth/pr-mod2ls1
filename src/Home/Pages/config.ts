interface Props {
    SPOTIFY_API_URL: string;
    SPOTIFY_SCOPE: string;
}

const config: Props =  {
    SPOTIFY_API_URL: 'https://api.spotify.com/v1',
    SPOTIFY_SCOPE: 'playlist-modify-private'
}
export default config;