// 1.upload form button
// 2.new album releases
// 3.new comments from other users

import NewReleases from "./NewReleases";
import {useNavigate} from "react-router";

const ArtistScreen = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        console.log("Upload new album");
        navigate("/upload-album");
    }

    return (
        <div>
            <h3 className="fw-bold text-white wd-summary-title">Artist Dashboard</h3>
            <button type="button" onClick={handleClick}>
                Upload New Album
            </button>
            <NewReleases />
        </div>
    )

}

export default ArtistScreen;