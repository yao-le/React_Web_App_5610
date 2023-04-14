import '../../style/track-details.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";


const TrackItem = ({track}) => {

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    // need to add some logic to handle the click event on the bookmark icon
    // 根据后端调整
    const handleCollectClick = () => {
        if (!currentUser) {
            alert("Please login first");
            navigate("/login");
        }
        console.log("collect a song");
        // implement like logic
    }

    // if track is null, return an empty div
    if (!track) {
        return <div></div>
    }

    const {
        name,
        album,
        duration_ms,
        preview_url,
    } = track;

    const duration = (duration_ms / 60000).toFixed(2).replace('.', ':');


    return (
        <div className="wd-track-details wd-track-details-content
        d-flex flex-row align-items-center">

            <div className="d-flex flex-column w-75">
                <div className="d-flex flex-row align-items-center">
                    <h3 className="wd-track-details-title">{name}</h3>
                    <i className="bi bi-bookmark-star-fill fs-5 ms-2 text-muted wd-bookmark"
                       onClick={handleCollectClick}>
                    </i>
                </div>
                <div className="d-flex flex-row align-items-center text-muted">
                    {
                        album && (
                        <Link to={`/details?album=${album.id}`} className="wd-link-no-decoration">
                            <div className="wd-track-details-album">{album.name}</div>
                        </Link>
                    )}
                    <div className={`wd-track-details-duration ${album ? ` ms-2` : ""}`}>{duration}</div>
                </div>
            </div>


            <div className="ms-auto wd-me-20">
                {preview_url && (
                    <audio controls>
                        <source src={preview_url} type="audio/mpeg"/>
                        Your browser does not support the audio element.
                    </audio>
                )}
                {
                    !preview_url &&
                    <div className="fw-bold text-muted fs-4">Preview not available</div>
                }
            </div>

        </div>
    );
};

export default TrackItem;
