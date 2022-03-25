import data from "../data/data";

function Mini() {
    return (
        <div class="mini">
            <div className="mini-song">
                <img src={data.album.images[2].url} className="center"/>
                <p>{data.name}</p>
                <p>{data.artists[0].name}</p>
                <p>{data.album.name}</p>
            </div>
        </div>
    );
}

export default Mini;