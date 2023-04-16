import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getLikedByUserId} from "../../services/likeTracks-service";
import TrackDetails from "../Details/TrackDetails";


const LikedSongs = () => {
    const currentUser = useSelector((state) => state.user.currentUser);

    const [likes, setLikes] = useState([]);

    const fetchLikedSongs = async () => {
        const likeRelations = await getLikedByUserId(currentUser._id);
        setLikes([...likeRelations]);

    }

    useEffect(() => {
        fetchLikedSongs();
    }, [likes]);

    return (
        <div className="mb-5">
            <h3 className="fw-bold text-white wd-summary-title">Liked Songs</h3>
            {
                likes.length > 0 ?
                    <>
                        {
                            likes.map((relation) =>
                                <TrackDetails key={relation._id} trackId={relation.spotifyTrackId} />
                            )
                        }
                    </> :
                    <>
                        <h4 className="fw-bold text-muted wd-summary-title">Tracks you like will appear here</h4>
                    </>
            }
        </div>
    )
}

export default LikedSongs;