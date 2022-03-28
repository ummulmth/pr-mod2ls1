import Playlist from "./Playlist";
import data from "../data/data";

const Track=()=> {
    return (
      <div className="album-card">
          {data.map((item)=>(
              <Playlist key={item.id} title= {item.name} artist={item.artists[0].name} img={item.album.images[0].url} />
          ))}
      </div>
    )
  }
  
  export default Track