import '../../style/track-details.css';
import {Link} from "react-router-dom";


const TrackItem = ({track}) => {

    // need to add some logic to handle the click event on the heart icon
    // 根据后端调整
    const handleClick = () => {
        console.log('clicked');
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
                    <i className="bi bi-bookmark-star-fill fs-5 ms-2 text-muted" onClick={handleClick}></i>
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
