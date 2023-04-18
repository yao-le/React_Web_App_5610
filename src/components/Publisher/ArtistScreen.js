// 1.upload button
// 2.released albums

import Releases from "./Releases";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";


// Artist Dashboard
const ArtistScreen = () => {
    const {currentUser} = useSelector((state) => state.user);

    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Upload new album");
        navigate("/upload-album");
    }

    return (
        <div>
            <h3 className="fw-bold text-white wd-summary-title">Artist Dashboard</h3>

            <button type="button" onClick={handleClick}
                    className="wd-upload-new-album-button ms-2 mt-4">
                Upload New Album
            </button>

            <div className="mt-4">
                <Releases artist={currentUser} />
            </div>
        </div>
    )
}

export default ArtistScreen;