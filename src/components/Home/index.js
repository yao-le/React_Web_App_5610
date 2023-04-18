import {useState, useEffect} from "react";
import {findAllLocalAlbums, getNewReleases} from "../../services/album-service";
import AlbumGrid from "../Summary/AlbumGrid";
import Navbar from "../Navbar";
import {useSelector} from "react-redux";
import LikedSongs from "./LikedSongs";
import NewMembers from "./NewMembers";
import {getUserById} from "../../services/auth/auth-service";

const Home = () => {
    const {currentUser} = useSelector((state) => state.user);

    // const [localReleases, setLocalReleases] = useState([]);
    // const [spotifyReleases, setSpotifyReleases] = useState([]);

    const [newReleases, setNewReleases] = useState([]);

    // from spotify
    const fetchNewReleases = async () => {
        const data = await getNewReleases("US", 20);
        if (data.albums) {
            return data.albums.items.map((album) => ({
                id: album.id,
                albumName: album.name,
                artistName: album.artists[0].name,
                albumImage: album.images && album.images[1]?.url,
                isLocal: false,
            }));
        }
        return [];
    };

    // from local
    const fetchLocalNewReleases = async () => {
        const data = await findAllLocalAlbums();
        if (data) {
            const albumsPromises = data.map(async (album) => {
                const artist = await getUserById(album.publisher);
                return {
                    id: album._id,
                    albumName: album.albumName,
                    artistName: artist.name,
                    albumImage: album.coverPic,
                    isLocal: true,
                };
            });
            const albums = await Promise.all(albumsPromises);
            return albums;
        }
        return [];
    };


    const fetchData = async () => {
        const localNewReleases = await fetchLocalNewReleases();
        const spotifyNewReleases = await fetchNewReleases();
        setNewReleases([...localNewReleases, ...spotifyNewReleases]);
    };

    useEffect(() => {
        fetchData();
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
                        <NewMembers/>

                        {/*only for logged-in users*/}
                        {
                            currentUser && <LikedSongs/>
                        }

                        <h3 className="fw-bold text-white wd-summary-title">New Album Releases</h3>
                        <AlbumGrid albums={newReleases}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;