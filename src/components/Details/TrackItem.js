import '../../style/track-item.css';
import {Link} from "react-router-dom";
import HeartIcon from "./HeartIcon";

// used for album details page
const TrackItem = ({track}) => {

    // if track is null, return an empty div
    if (!track) {
        return <div></div>
    }


    return (
        <div className="row align-items-center mb-4 wd-width-90">
            <div className="col-md-7 col-sm-12">
                <div className="d-flex flex-column">

                    <div className="d-flex flex-row align-items-center">
                        <h3 className="wd-track-details-title">{track.trackName}</h3>
                        <HeartIcon track={track} />
                    </div>

                    <div className="d-flex flex-row align-items-center text-muted">
                        {
                            !track.isLocal && track.albumId && (
                                <Link to={`/details?album=${track.albumId}`} className="wd-link-no-decoration">
                                    <div className="wd-track-details-album">{track.albumName}</div>
                                </Link>
                            )
                        }
                        {
                            track.isLocal && track.albumId && (
                                <Link to={`/details?localAlbum=${track.albumId}`} className="wd-link-no-decoration">
                                    <div className="wd-track-details-album">{track.albumName}</div>
                                </Link>
                            )
                        }
                        <div className={`wd-track-details-duration ${track.albumId ? ` ms-2` : ""}`}>{track.duration}</div>
                    </div>
                </div>
            </div>

            <div className="col-md-5 col-sm-12 text-md-end text-sm-center">
                {
                    track.previewUrl && (
                    <audio controls>
                        <source src={track.previewUrl} type="audio/mpeg"/>
                        Your browser does not support the audio element.
                    </audio>
                )}
                {
                    !track.previewUrl &&
                    <div className="fw-bold text-muted fs-4">
                        Preview not available
                    </div>
                }
            </div>
        </div>
    );
};

export default TrackItem;
