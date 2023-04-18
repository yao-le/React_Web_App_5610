import {Link} from "react-router-dom";
import HeartIcon from "./HeartIcon";
import "../../style/track-details.css";

// used for home page and profile page?
const TrackDetails = ({ track, onDislike }) => {

    // if track is null
    if (!track) {
        return <div>Loading track details...</div>
    }

    const handleDislikeClick = () => {
        onDislike(track.id);
    };


    return (
        <div className="wd-track-item d-flex flex-row align-items-center
                        wd-width-85 container">
            <div className="wd-track-album-cover">
                {/*album cover*/}
                {
                    !track.isLocal &&
                    < Link to={`/details?album=${track.albumId}`} className="wd-link-no-decoration">
                        <img src={track.albumImage || "https://media.istockphoto.com/id/1153663901/vector/black-music-notes-icon-vector.jpg?s=612x612&w=0&k=20&c=9UACzmfKRu7aGtznDYPepgusXU8lqr_Xi21_E73RNhs="}
                             alt="album cover" />
                    </Link>
                }
                {
                    track.isLocal &&
                    < Link to={`/details?localAlbum=${track.albumId}`} className="wd-link-no-decoration">
                        <img src={track.albumImage || "https://media.istockphoto.com/id/1153663901/vector/black-music-notes-icon-vector.jpg?s=612x612&w=0&k=20&c=9UACzmfKRu7aGtznDYPepgusXU8lqr_Xi21_E73RNhs="}
                             alt="album cover" />
                    </Link>
                }
            </div>

            <div className="wd-track-info d-flex flex-column ms-3">
                <div className="d-flex flex-row align-items-center">
                    {/*track name*/}
                    <div className="wd-track-name">{track.trackName}</div>
                    {/*album name*/}
                    {
                        !track.isLocal &&
                        <Link to={`/details?album=${track.albumId}`} className="wd-link-no-decoration">
                            <div className="wd-track-album-name ms-2">
                                {track.albumName}
                            </div>
                        </Link>
                    }
                    {
                        track.isLocal &&
                        <Link to={`/details?localAlbum=${track.albumId}`} className="wd-link-no-decoration">
                            <div className="wd-track-album-name ms-2">
                                {track.albumName}
                            </div>
                        </Link>
                    }
                </div>

                <div className="wd-track-artists text-muted">
                    {track.artists}
                </div>
            </div>

            <div className="wd-track-controls ms-auto">
                {
                    track.previewUrl && (
                    <audio controls>
                        <source src={track.previewUrl} type="audio/mpeg"/>
                        Your browser does not support the audio element.
                    </audio>
                )}
                {
                    !track.previewUrl &&
                    <div className="fw-bold text-muted fs-6 wd-no-preview">
                        Preview not available
                    </div>
                }
            </div>

            <div className="wd-track-heart ms-4">
                <HeartIcon track={track} onDislike={handleDislikeClick} />}
            </div>

            <div className="wd-track-duration ms-4">
                {track.duration}
            </div>
        </div>
    )
};

export default TrackDetails;
