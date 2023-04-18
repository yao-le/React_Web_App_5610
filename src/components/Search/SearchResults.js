import AlbumGrid from "../Summary/AlbumGrid";
import TrackDetails from "../Details/TrackDetails";

const SearchResults = ({albums, tracks}) => {

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
                        tracks.map((track) => <TrackDetails key={track.id} track={track}/>)
                    }
                </div>
            }

            { albums.length > 0 &&
                <div>
                    <h3 className="fw-bold text-white wd-summary-title">Albums</h3>
                    <AlbumGrid albums={albums}/>
                </div>
            }

        </div>
    )
 }

 export default SearchResults;