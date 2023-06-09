import '../../style/track-item.css';
import {Link} from "react-router-dom";
import HeartIcon from "./HeartIcon";

// used for album details page
const TrackItem = ({track}) => {

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
        <div className="row align-items-center mb-4 wd-width-90">
            <div className="col-md-7 col-sm-12">
                <div className="d-flex flex-column">

                    <div className="d-flex flex-row align-items-center">
                        <h3 className="wd-track-details-title">{name}</h3>
                        <HeartIcon track={track} />
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
            </div>

            <div className="col-md-5 col-sm-12 text-md-end text-sm-center">
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
