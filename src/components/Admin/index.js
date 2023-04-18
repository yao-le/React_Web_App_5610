import Navbar from "../Navbar";
import {useEffect, useState} from "react";
import {getAllUsers, getUserById} from "../../services/auth/auth-service";
import ProfileGrid from "../Summary/ProfileGrid";
import {useSelector} from "react-redux";
import {findAllLocalAlbums} from "../../services/album-service";
import AlbumGrid from "../Summary/AlbumGrid";


const Admin = () => {

    const {currentUser} = useSelector((state) => state.user);

    // all local users
    const [allUsers, setAllUsers] = useState([]);
    // all local albums
    const [allAlbums, setAllAlbums] = useState([]);

    const fetchAllUsers = async () => {
        const fetchedUsers = await getAllUsers();
        // const users = fetchedUsers.filter(user =>
        //     user._id !== currentUser._id);
        setAllUsers(fetchedUsers);
    }

    const fetchAllAlbums = async () => {
        const fetchedAlbums = await findAllLocalAlbums();
        if (fetchedAlbums) {
            const albumsPromises = fetchedAlbums.map(async (album) => {
                const artist = await getUserById(album.publisher);
                return {
                    id: album._id,
                    albumName: album.albumName,
                    artistName: artist.name,
                    albumImage: album.coverPic,
                    isLocal: true,
                };
            });
            const albumsData = await Promise.all(albumsPromises);
            setAllAlbums(albumsData);
        }
    }

    useEffect(() => {
        fetchAllUsers();
        fetchAllAlbums()
    }, []);

    return (
        <div className="row wd-bg-color-black wd-container">
            <div className="d-none d-sm-none d-md-block col-2">
                <Navbar/>
            </div>

            <div className="col-12 col-md-10">
                <div className="wd-width-95">
                    <div className="wd-bg-color-black">

                        <h3 className="fw-bold text-white wd-summary-title">Manage Members</h3>
                        {
                            allUsers.length > 0 ?
                                <ProfileGrid users={allUsers} /> :
                                <h4 className="fw-bold text-muted wd-summary-title">No Members</h4>
                        }

                        <h3 className="fw-bold text-white wd-summary-title mt-2">Manage Albums</h3>
                        {
                            allAlbums.length > 0 ?
                                <AlbumGrid albums={allAlbums} /> :
                                <h4 className="fw-bold text-muted wd-summary-title">No Albums</h4>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Admin;