import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCollectedByUserId} from "../../services/collectAlbums-service";
import {getAlbumById, getLocalAlbumById} from "../../services/album-service";
import AlbumGrid from "../Summary/AlbumGrid";
import {getUserById} from "../../services/auth/auth-service";

const Collections = () => {
    const {currentUser} = useSelector((state) => state.user);

    const [collection, setCollection] = useState([]);

    // fetch current user's album collections
    const fetchAlbumCollection = async () => {
        // return [{userId, albumId}] relations
        const collectsRelations = await getCollectedByUserId(currentUser._id)
        const albumPromises = collectsRelations.map(async (relation) => {
            if (relation.isLocal) {
                const album = await getLocalAlbumById(relation.albumId);
                const publisher = await getUserById(album.publisher);
                return {
                    id: album?._id,
                    albumName: album?.albumName,
                    artistName: publisher?.name,
                    albumImage: album?.coverPic,
                    isLocal: true,
                }
            } else {
                const album =  await getAlbumById(relation.albumId);
                return {
                    id: album?.id,
                    albumName: album?.name,
                    artistName: album.artists && album.artists[0]?.name,
                    albumImage: album.images && album.images[1]?.url,
                    isLocal: false,
                }
            }
        });
        const collectedAlbums = await Promise.all(albumPromises);
        console.log(collectedAlbums)
        setCollection([...collectedAlbums]);
    }


    useEffect(() => {
        fetchAlbumCollection();
    }, []);

    return (
        <>
            <h3 className="fw-bold text-white wd-summary-title">Collections</h3>
            {
                collection.length > 0 ?
                    <AlbumGrid albums={collection}/> :
                    <h4 className="fw-bold text-muted wd-summary-title mb-5">No album collections yet</h4>
            }
        </>
    )
}

export default Collections;