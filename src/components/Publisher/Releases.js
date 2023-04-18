import {findLocalAlbumsByPublisherId} from "../../services/album-service";
import {useEffect, useState} from "react";
import AlbumGrid from "../Summary/AlbumGrid";
import {getUserById} from "../../services/auth/auth-service";

const Releases = ({artist}) => {

    const [albums, setAlbums] = useState([]);

    const fetchReleases = async () => {
        let fetchedAlbums = await findLocalAlbumsByPublisherId(artist._id);
        if (fetchedAlbums) {
            // create an array of promises
            const albumsPromises = fetchedAlbums.map(async (album) => {
                const publisher = await getUserById(album.publisher);
                return {
                    id: album._id,
                    albumName: album.albumName,
                    artistName: publisher.name,
                    albumImage: album.coverPic,
                    isLocal: true,
                };
            });

            const data = await Promise.all(albumsPromises);
            setAlbums(data);
        }
    };


    useEffect(() => {
            fetchReleases();
        }, [])


    return (
        <>
            <h3 className="fw-bold text-white wd-summary-title">Releases</h3>
            <AlbumGrid albums={albums} />
        </>
    )
}

export default Releases;