import { getAlbumById } from '../../services/album-service';
import { useEffect, useState } from 'react';
import '../../style/details-style.css';
import TrackItem from './TrackItem';

const AlbumDetails = ({ albumId }) => {
    const [album, setAlbum] = useState(null);

    const fetchAlbumInfo = async () => {
        const albumInfo = await getAlbumById(albumId);
        setAlbum(albumInfo);
    };

    useEffect(() => {
        fetchAlbumInfo();
    });

    if (!album) {
        return <div>Loading album details...</div>;
    }

    return (
        <div className="wd-details mt-5">
            <div className="wd-details-header">
                <img
                    className="wd-details-img"
                    src={album.images[0]?.url}
                    alt={album.name}
                />

                <div className="wd-details-info ms-4">
                    <div className="mb-2 text-uppercase fw-bold text-muted">
                        {album.type}
                    </div>
                    <div className="wd-details-title">{album.name}</div>
                    <p className="wd-details-artist fw-bold text-muted">
                        {album.artists.map((artist, index) => (
                            <span key={artist.id}>
                                {artist.name}
                                {index !== album.artists.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </p>
                    <div className="wd-details-meta fw-bold text-muted fs-6 mt-2">
                        <span className="wd-details-release-date">
                            Release date: {album.release_date}
                        </span>
                        <span className="wd-details-total-tracks ms-2">
                            Total tracks: {album.tracks.items.length}
                        </span>
                    </div>
                </div>
            </div>

            <div className="wd-details-tracks mt-5">
                <ul>
                    {album.tracks.items.map((track) => (
                        <TrackItem key={track.id} track={track} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AlbumDetails;