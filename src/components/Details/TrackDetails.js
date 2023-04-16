import {Link} from "react-router-dom";
import {getTrackById} from "../../services/track-service";
import {useEffect, useState} from "react";
import HeartIcon from "./HeartIcon";
import "../../style/track-details.css";

// used for home page and profile page?
// trackId refers to the spotidy track id
const TrackDetails = ({trackId}) => {

    const [track, setTrack] = useState(null);

    const fetchTrackInfo = async () => {
        const trackInfo = await getTrackById(trackId);
        setTrack(trackInfo);
    }

    useEffect(() => {
        fetchTrackInfo();
    }, []);


    // if track is null, return an empty div
    if (!track) {
        return <div></div>
    }

    const {
        name,
        album,
        artists,
        duration_ms,
        preview_url,
    } = track;

    const duration = (duration_ms / 60000).toFixed(2).replace('.', ':');


    return (
        <div className="wd-track-item d-flex flex-row align-items-center
                        wd-width-85 container">
            <div className="wd-track-album-cover">
                <img src={album?.images[0].url} alt="album cover" className="img-fluid"/>
            </div>

            <div className="wd-track-info d-flex flex-column ms-3">
                <div className="d-flex flex-row align-items-center">
                    {/*artist name*/}
                    <div className="wd-track-name">{name}</div>
                    {/*album name*/}
                    <Link to={`/details?album=${album?.id}`} className="wd-link-no-decoration">
                        <div className="wd-track-album-name ms-2">
                            {album?.name}
                        </div>
                    </Link>
                </div>

                <div className="wd-track-artists text-muted">
                    {artists?.map((artist, index) => (
                        <span key={artist.id}>
                                {artist.name}
                            {index !== artists.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>
            </div>

            <div className="wd-track-controls ms-auto">
                {preview_url && (
                    <audio controls>
                        <source src={preview_url} type="audio/mpeg"/>
                        Your browser does not support the audio element.
                    </audio>
                )}
                {
                    !preview_url &&
                    <div className="fw-bold text-muted fs-6 wd-no-preview">Preview not available</div>
                }
            </div>

            <div className="wd-track-heart ms-4">
                <HeartIcon track={track} />}
            </div>

            <div className="wd-track-duration ms-4">
                {duration}
            </div>
        </div>
    )
};

export default TrackDetails;
