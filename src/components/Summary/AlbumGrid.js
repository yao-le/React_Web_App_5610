import AlbumItem from "./AlbumItem";
import {Link} from "react-router-dom";


const AlbumGrid = ({albums}) => {
    return (
        <div className="wd-summary-grid wd-bg-black-color">
            {
                albums.map((album) => {
                    if (!album.isLocal) {
                        return (
                            <Link to={`/details?album=${album.id}`} className="wd-link-no-decoration"
                                  key={album.id}>
                                <AlbumItem album={album}/>
                            </Link>
                        )
                    } else {
                        return (
                            <Link to={`/details?localAlbum=${album.id}`} className="wd-link-no-decoration"
                                  key={album.id}>
                                <AlbumItem album={album}/>
                            </Link>
                        )
                    }
                })}
        </div>
    )
}

export default AlbumGrid;
