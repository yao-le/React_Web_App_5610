import PlaylistItem from "./PlaylistItem";
import {Link} from "react-router-dom";


const PlaylistGrid = ({playlists}) => {
    return (
        <div className="wd-summary-grid wd-bg-black-color">
            {playlists.map((playlist) => (
                <Link to={`/details?playlist=${playlist.id}`} className="wd-link-no-decoration" key={playlist.id}>
                    <PlaylistItem playlist={playlist}/>
                </Link>
            ))}
        </div>
    )
}

export default PlaylistGrid;