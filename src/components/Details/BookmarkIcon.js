import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {createCollectAlbum, deleteCollectAlbum, findCollectAlbum} from "../../services/collectAlbums-service";

// collect/un-collect an album
const BookmarkIcon = ({ album }) => {
    const {currentUser} = useSelector((state) => state.user);

    const [collected, setCollected] = useState(false);

    const navigate = useNavigate();

    // handle the click event on the bookmark icon
    const handleClick = async () => {
        if (!currentUser) {
            alert("Please login first");
            navigate("/login");
            return;
        }
        // only logged-in user can collect/un-collect an album
        if (!collected) {
            console.log("collects an album");
            const newCollectRelation = {
                userId: currentUser._id,
                albumId: album.id,
                isLocal: album.isLocal, // album from local or spotify
            }
            const response = await createCollectAlbum(newCollectRelation);
            if (response) {
                setCollected(true);
            }
        } else {
            console.log("un-collects an album");
            const response = await deleteCollectAlbum(currentUser._id, album.id);
            if (response.deletedCount > 0) {
                setCollected(false);
            }
        }
    }

    // fetch the collect relation between the current user and the album
    const fetchCollectRelation = async () => {
        const response = await findCollectAlbum(currentUser._id, album.id);
        if (response) {
            setCollected(true)
        }
    }

    useEffect(() => {
        if (currentUser) {
            fetchCollectRelation();
        }
    }, []);

    return (
        <i className={`bi bi-bookmark-star-fill ms-3 fs-5 
           ${collected ?  "wd-bookmark-liked" : "wd-bookmark"}`}
           onClick={handleClick}>
        </i>
    )
}


export default BookmarkIcon;