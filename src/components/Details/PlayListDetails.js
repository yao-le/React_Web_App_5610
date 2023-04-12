import {useState, useEffect} from 'react';
import '../../style/details-style.css';
import {getPlaylistById} from '../../services/playlist-service';
import TrackItem from './TrackItem';

const PlaylistDetails = ({playlistId}) => {
    const [playlist, setPlaylist] = useState(null);

    const fetchPlaylistInfo = async () => {
        const playlistInfo = await getPlaylistById(playlistId);
        setPlaylist(playlistInfo);
    };

    useEffect(() => {
        fetchPlaylistInfo();
    });

    if (!playlist) {
        return <div>Loading playlist details...</div>;
    }

    return (
        <div className="wd-details mt-5">
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
                    <div className="wd-details-title">{playlist.name}</div>
                    <div className="wd-details-description fw-bold text-muted">{playlist.description}</div>

                    <div className="wd-details-meta text-muted fs-6 fw-bold mt-2">
                        <span className="wd-details-owner">
                            By {playlist.owner?.display_name}
                        </span>
                        <span className="wd-details-total-tracks ms-2">
                            {playlist.tracks?.total} Songs
                        </span>
                    </div>
                </div>
            </div>

            <div className="wd-details-tracks mt-5">
                <ul>
                    {playlist.tracks?.items?.map((item) => (
                        <TrackItem key={item.track.id} track={item.track}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlaylistDetails;
