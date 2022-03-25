import data from "../data/data";

export default function Playlist() {

    return (
        <div class="song-item">
          <img
            src={data.album.images[1].url}
          />
          <div class="song-title">Bohemian Rhapsody</div>
          <div class="singer">{data.artists[0].name}</div>
          <div class="album-title">{data.album.name}</div>
        </div>
    );
}