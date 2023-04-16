import AlbumGrid from "../Summary/AlbumGrid";
import PlaylistGrid from "../Summary/PlaylistGrid";
import {useNavigate} from "react-router";
import TrackDetails from "../Details/TrackDetails";

const SearchResults = ({albums, tracks, playlists}) => {

    // const navigate = useNavigate();

    // if (!albums.length && !playlists.length) {
    //     navigate("/search");
    // }

    return (
        <div className="wd-bg-color-black">

            <h3 className="fw-bold text-white wd-summary-title mb-2">Search Results</h3>

            { tracks.length > 0 &&
                <div>
                    <h3 className="fw-bold text-white wd-summary-title">Tracks</h3>
                    {
                        tracks.map((track) => <TrackDetails key={track.id} trackId={track.id}/>)
                    }
                </div>
            }

            { albums.length > 0 &&
                <div>
                    <h3 className="fw-bold text-white wd-summary-title">Albums</h3>
                    <AlbumGrid albums={albums}/>
                </div>
            }

            {/*disabled for now*/}
            {/*{ playlists.length > 0 &&*/}
            {/*    <div>*/}
            {/*        <h3 className="fw-bold text-white wd-summary-title">Playlists</h3>*/}
            {/*        <PlaylistGrid playlists={playlists}/>*/}
            {/*    </div>*/}
            {/*}*/}

        </div>
    )
 }

 export default SearchResults;