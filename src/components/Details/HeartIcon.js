import {useEffect, useState} from "react";
import {createLikeTrack, deleteLikeTrack, findLikeTrack} from "../../services/likeTracks-service";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

const HeartIcon = ({ track }) => {
    const {currentUser} = useSelector((state) => state.user);

    const [liked, setLiked] = useState(false);

    const navigate = useNavigate();

    // handle the click event on the heart icon
    const handleClick = async () => {
        if (!currentUser) {
            alert("Please login first");
            navigate("/login");
            return;
        }
        // only logged-in user can like/dislike a song
        if (!liked) {
            console.log("likes a song");
            const newLikeRelation = {
                userId: currentUser._id,
                spotifyTrackId: track.id,
            }
            const data = await createLikeTrack(newLikeRelation);
            if (data) {
                setLiked(true);
            }
        } else {
            console.log("dislikes a song");
            const response = await deleteLikeTrack(currentUser._id, track.id);
            if (response.deletedCount > 0) {
                setLiked(false);
            }
        }
    }

    // fetch the like relation between the current user and the track
    const fetchLikeRelation = async () => {
        const data = await findLikeTrack(currentUser._id, track.id);
        if (data) {
            setLiked(true);
        }
    }

    useEffect(() => {
        if (currentUser) {
            fetchLikeRelation();
        }
    }, []);

    return (
        <i className={`bi bi-suit-heart-fill fs-5 ms-3 
                       ${liked ?  "wd-bookmark-liked" : "wd-bookmark"}`}
           onClick={handleClick}>
        </i>
    )
}


export default HeartIcon;