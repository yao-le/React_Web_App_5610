import {useState, useEffect} from "react";
import {getNewReleases} from "../../services/album-service";
import {getFeaturedPlaylists} from "../../services/playlist-service";
import AlbumGrid from "../Summary/AlbumGrid";
import PlaylistGrid from "../Summary/PlaylistGrid";

const HomeScreen = () => {
    const [newReleases, setNewReleases] = useState([]);
    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);


    const fetchNewReleases = async () => {
        const data = await getNewReleases("US", 10);
        if (data.albums) {
            setNewReleases([...data.albums.items]);
        }
    }

    const fetchFeaturedPlaylists = async () => {
        const data = await getFeaturedPlaylists("US", 10);
        if (data.playlists) {
            setFeaturedPlaylists([...data.playlists.items]);
        }
    }


    useEffect(() => {
        fetchNewReleases();
        fetchFeaturedPlaylists();
    }, []);


    return (
        <div className="wd-bg-color-black">

            <h3 className="fw-bold text-white wd-summary-title">New Releases</h3>
            <AlbumGrid albums={newReleases}/>

            <h3 className="fw-bold text-white wd-summary-title">Featured Playlists</h3>
            <PlaylistGrid playlists={featuredPlaylists}/>

        </div>
    )
}

export default HomeScreen;