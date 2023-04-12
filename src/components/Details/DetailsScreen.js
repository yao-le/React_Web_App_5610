import {useSearchParams} from "react-router-dom";
import AlbumDetails from "./AlbumDetails";
import PlayListDetails from "./PlayListDetails";
import Navbar from "../Navbar";
import PlaylistGrid from "../Summary/PlaylistGrid";
import AlbumGrid from "../Summary/AlbumGrid";



const DetailsScreen = () => {
    const [searchParams] = useSearchParams();
    const albumId = searchParams.get("album");
    const playlistId = searchParams.get("playlist")


    return (
        <div className="row wd-bg-color-black wd-container">
            <div className="d-none d-sm-none d-md-block col-2">
                <Navbar/>
            </div>

            <div className="col-12 col-md-10">
                <div className="wd-width-90">
                    <div className="wd-bg-color-black">
                        { albumId && <AlbumDetails albumId={albumId} /> }
                        { playlistId && <PlayListDetails playlistId={playlistId}/> }
                    </div>
                </div>
            </div>

        </div>
    )

}

export default DetailsScreen;