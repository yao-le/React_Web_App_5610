import AlbumItem from "./AlbumItem";
import {Link} from "react-router-dom";


const AlbumGrid = ({albums}) => {
    return (
        <div className="wd-summary-grid wd-bg-black-color">
            {albums.map((album) => (
                <Link to={`/details?album=${album.id}`} className="wd-link-no-decoration"  key={album.id} >
                    <AlbumItem album={album}/>
                </Link>
            ))}
        </div>
    )
}

export default AlbumGrid;
