import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getLikedByUserId} from "../../services/likeTracks-service";
import TrackDetails from "../Details/TrackDetails";
import {getLocalTrackById, getTrackById} from "../../services/track-service";
import {getLocalAlbumById} from "../../services/album-service";
import {getUserById} from "../../services/auth/auth-service";


const LikedSongs = () => {
    const currentUser = useSelector((state) => state.user.currentUser);

    const [likes, setLikes] = useState([]);

    const fetchLikedSongs = async () => {
        const likeRelations = await getLikedByUserId(currentUser._id);

        const likePromises = likeRelations.map(async (relation) => {
            if (!relation.isLocal) {
                const track = await getTrackById(relation.trackId);
                const duration = (track.duration_ms / 60000).toFixed(2).replace(".", ":");
                const artists = track.artists.map((artist) => artist.name).join(", ");
                return {
                    id: track.id,
                    trackName: track.name,
                    albumName: track.album?.name,
                    albumId: track.album?.id,
                    albumImage: track.album?.images[0].url,
                    artists,
                    duration,
                    previewUrl: track.preview_url,
                    isLocal: false,
                };
            } else {
                // local track
                const track = await getLocalTrackById(relation.trackId);
                const album = await getLocalAlbumById(track.album);
                const publisher = await getUserById(album.publisher);
                return {
                    id: track._id,
                    trackName: track.trackName,
                    albumName: album.albumName,
                    albumId: album._id,
                    albumImage: album.coverPic,
                    artists: publisher.name,
                    duration: track.duration,
                    isLocal: true,
                };
            }
        });

        const likedSongs = await Promise.all(likePromises);
        setLikes([...likedSongs]);
    };

    useEffect(() => {
        fetchLikedSongs();
    }, []);


    const handleDislike = (id) => {
        setLikes(likes.filter((track) => track.id !== id));
    };


    return (
        <div className="mb-5">
            <h3 className="fw-bold text-white wd-summary-title">Liked Songs</h3>
            <div className="ms-2">
            {
                likes.length > 0 ?
                    <>
                        {
                            likes.map((track) =>
                                <TrackDetails key={track.id}
                                              track={track}
                                              onDislike={handleDislike} />
                            )
                        }
                    </> :
                    <>
                        <h4 className="fw-bold text-muted wd-summary-title">Tracks you like will appear here</h4>
                    </>
            }
            </div>
        </div>
    )
}

export default LikedSongs;