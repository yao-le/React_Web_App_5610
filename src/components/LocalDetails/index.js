import {useSearchParams} from "react-router-dom";
import Navbar from "../Navbar";
import LocalAlbumDetails from "./LocalAlbumDetails";

const LocalDetails = () => {
    const [searchParams] = useSearchParams();
    const albumId = searchParams.get("album");

    return (
        <div className="row wd-bg-color-black wd-container">
            <div className="d-none d-sm-none d-md-block col-2">
                <Navbar/>
            </div>

            <div className="col-12 col-md-10">
                <div className="wd-width-95">
                    <div className="wd-bg-color-black">
                        {albumId && <LocalAlbumDetails albumId={albumId}/>}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LocalDetails;