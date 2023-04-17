import {useState, useEffect} from "react";
import {getNewReleases} from "../../services/album-service";
import {getFeaturedPlaylists} from "../../services/playlist-service";
import AlbumGrid from "../Summary/AlbumGrid";
import PlaylistGrid from "../Summary/PlaylistGrid";
import Navbar from "../Navbar";
import {getRecommendations} from "../../services/track-service";
import {useSelector} from "react-redux";
import LikedSongs from "./LikedSongs";
import NewMembers from "./NewMembers";

const Home = () => {
    const {currentUser} = useSelector((state) => state.user);


    const [newReleases, setNewReleases] = useState([]);
    // const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
    // const [recommendedAlbums, setRecommendedAlbums] = useState([]);


    const fetchNewReleases = async () => {
        const data = await getNewReleases("US", 20);
        if (data.albums) {
            setNewReleases([...data.albums.items]);
        }
    }

    // const fetchRecommendedAlbums = async () => {
    //     if (!currentUser && currentUser.role !== "user") {
    //         return;
    //     }
    //     const data = await getRecommendations(currentUser.favoriteGenres, 16);
    //     if (data.tracks) {
    //         const albums = data.tracks.map((track) => track.album);
    //         setRecommendedAlbums([...albums]);
    //     }
    // }

    // const fetchFeaturedPlaylists = async () => {
    //     const data = await getFeaturedPlaylists("US", 10);
    //     if (data.playlists) {
    //         setFeaturedPlaylists([...data.playlists.items]);
    //     }
    // }


    useEffect(() => {
        fetchNewReleases();
        // fetchRecommendedAlbums()
        //fetchFeaturedPlaylists();
    }, []);


    return (
        <div className="row wd-bg-color-black wd-container">
            <div className="d-none d-sm-none d-md-block col-2">
                <Navbar/>
            </div>

            <div className="col-12 col-md-10">
                <div className="wd-width-95">
                    <div className="wd-bg-color-black">
                        {/*for both anonymous users and logged-in users*/}
                        <NewMembers />

                        {/*only for logged-in users*/}
                        {
                            currentUser && <LikedSongs />
                        }

                        <h3 className="fw-bold text-white wd-summary-title">New Album Releases</h3>
                        <AlbumGrid albums={newReleases}/>

                        {/*不需要的功能*/}
                        {/*/!*for viewers*!/*/}
                        {/*{*/}
                        {/*    currentUser && currentUser.role === "viewer" &&*/}
                        {/*    recommendedAlbums.length > 0 &&*/}
                        {/*    <>*/}
                        {/*    <h3 className="fw-bold text-white wd-summary-title">Recommendation</h3>*/}
                        {/*    <AlbumGrid albums={recommendedAlbums}/>*/}
                        {/*    </>*/}
                        {/*}*/}

                        {/*<h3 className="fw-bold text-white wd-summary-title">Featured Playlists</h3>*/}
                        {/*<PlaylistGrid playlists={featuredPlaylists}/>*/}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;