import {useState, useEffect} from "react";
import {getNewReleases} from "../../services/album-service";
import {getFeaturedPlaylists} from "../../services/playlist-service";
import AlbumGrid from "../Summary/AlbumGrid";
import PlaylistGrid from "../Summary/PlaylistGrid";
import Navbar from "../Navbar";

const HomeScreen = () => {
    const [newReleases, setNewReleases] = useState([]);
    // const [featuredPlaylists, setFeaturedPlaylists] = useState([]);


    const fetchNewReleases = async () => {
        const data = await getNewReleases("US", 32);
        if (data.albums) {
            setNewReleases([...data.albums.items]);
        }
    }

    // const fetchFeaturedPlaylists = async () => {
    //     const data = await getFeaturedPlaylists("US", 10);
    //     if (data.playlists) {
    //         setFeaturedPlaylists([...data.playlists.items]);
    //     }
    // }


    useEffect(() => {
        fetchNewReleases();
        //fetchFeaturedPlaylists();
    }, []);


    return (
        <div className="row wd-bg-color-black wd-container">
            <div className="d-none d-sm-none d-md-block col-2">
                <Navbar />
            </div>

            <div className="col-12 col-md-10">
                <div className="wd-bg-color-black">

                    <h3 className="fw-bold text-white wd-summary-title">New Album Releases</h3>
                    <AlbumGrid albums={newReleases}/>

                    {/*不需要的功能*/}
                    {/*<h3 className="fw-bold text-white wd-summary-title">Featured Playlists</h3>*/}
                    {/*<PlaylistGrid playlists={featuredPlaylists}/>*/}
                </div>
            </div>

        </div>
    )
}

export default HomeScreen;