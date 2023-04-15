import AlbumGrid from "../Summary/AlbumGrid";
import PlaylistGrid from "../Summary/PlaylistGrid";
import {useNavigate} from "react-router";

const SearchResults = ({albums, playlists}) => {

    // const navigate = useNavigate();

    // if (!albums.length && !playlists.length) {
    //     navigate("/search");
    // }

    return (
        <div className="wd-bg-color-black">

            <h3 className="fw-bold text-white wd-summary-title mb-2">Search Results</h3>

            { albums.length &&
                <div>
                    <h3 className="fw-bold text-white wd-summary-title">Albums</h3>
                    <AlbumGrid albums={albums}/>
                </div>
            }

            { playlists.length &&
                <div>
                    <h3 className="fw-bold text-white wd-summary-title">Playlists</h3>
                    <PlaylistGrid playlists={playlists}/>
                </div>
            }

        </div>
    )
 }

 export default SearchResults;