import {useState, useEffect} from 'react';
import '../../style/details-style.css';
import {getPlaylistById} from '../../services/playlist-service';
import TrackItem from './TrackItem';
import CommentForm from "../Comment/CommentForm";

const PlaylistDetails = ({playlistId}) => {
    const [playlist, setPlaylist] = useState(null);

    const submitReview = (reviewText) => {
        console.log('Playlist review submitted:', reviewText);
        // Implement review submission logic here
    };

    const fetchPlaylistInfo = async () => {
        const playlistInfo = await getPlaylistById(playlistId);
        setPlaylist(playlistInfo);
    };

    useEffect(() => {
        fetchPlaylistInfo();
    },[]);

    if (!playlist) {
        return <div>Loading playlist details...</div>;
    }

    return (
        <div className="wd-details mt-5 container">
            <div className="wd-details-header">
                <img
                    className="wd-details-img"
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
                />
                <div className="wd-details-info ms-4">
                    <div className="mb-2 text-uppercase fw-bold text-muted">
                        {playlist.type}
                    </div>
                    <div className="wd-details-title text-uppercase">{playlist.name}</div>
                    <div className="wd-details-description fw-bold text-muted">{playlist.description}</div>

                    <div className="wd-details-meta text-muted fs-6 fw-bold mt-2">
                        <span className="wd-details-owner">
                            By {playlist.owner?.display_name}
                        </span>
                        <span className="wd-details-total-tracks ms-3">
                            {playlist.tracks?.total} Songs
                        </span>
                        <i className="bi bi-heart-fill ms-3 fs-4 wd-bookmark"></i>
                    </div>
                </div>
            </div>

            {/*Comment Form*/}
            <div>
                <CommentForm submitReview={submitReview} />
            </div>

            <div className="wd-details-tracks my-5">
                <ul>
                    {playlist.tracks?.items?.map((item) => (
                        <TrackItem key={item.track?.id} track={item.track}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlaylistDetails;
