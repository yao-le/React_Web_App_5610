import {useSearchParams} from "react-router-dom";
import AlbumDetails from "./AlbumDetails";
import Navbar from "../Navbar";
import {useEffect, useState} from "react";
import {getAlbumById, getLocalAlbumById} from "../../services/album-service";
import {getTracksByAlbumId} from "../../services/track-service";
import {getUserById} from "../../services/auth/auth-service";


const Details = () => {
    const [searchParams] = useSearchParams();
    const albumId = searchParams.get("album");
    const localAlbumId = searchParams.get("localAlbum");

    const [album, setAlbum] = useState();

    const fetchSpotifyAlbum = async () => {
        const album = await getAlbumById(albumId);
        const artists = album.artists.map(artist => artist.name).join(', ');
        // reformat data
        const data = {
            id: album.id,
            name: album.name,
            artists,
            image: album.images[0]?.url,
            releaseDate: album.release_date,
            totalTracks: album.tracks.items.length,
            isLocal: false
        };

        data.tracks = album.tracks.items.map(track => {
            const duration = (track.duration_ms / 60000).toFixed(2).replace('.', ':');
            return {
                id: track.id,
                trackName: track.name,
                albumName: album.name,
                albumId: album.id,
                artists: track.artists.map(artist => artist.name).join(', '),
                duration,
                previewUrl: track.preview_url,
                isLocal: false,
            }
        });
        setAlbum(data);
    }

    const fetchLocalAlbum = async () => {
        const album = await getLocalAlbumById(localAlbumId);
        const publisher = await getUserById(album.publisher);
        const data = {
            id: album._id,
            name: album.albumName,
            artists: publisher.name,
            publisherId:album.publisher,
            image: album.coverPic,
            releaseDate: album.createdAt.slice(0, 7),
            totalTracks: album.totalTracks,
            description: album.description,
            isLocal: true,
        };
        const tracks = await getTracksByAlbumId(album._id);
        data.tracks = tracks.map(track => {
            return {
                id: track._id,
                trackName: track.trackName,
                albumName: album.albumName,
                albumId: album._id,
                artists: publisher.name,
                duration: track.duration,
                isLocal: true,
            }
        });
        setAlbum(data);
    }

    useEffect(() => {
        if (albumId) {
            fetchSpotifyAlbum();
        }
        if (localAlbumId) {
            fetchLocalAlbum();
        }
    }, [albumId, localAlbumId]);


    return (
        album ?
            <div className="row wd-bg-color-black wd-container">
                <div className="d-none d-sm-none d-md-block col-2">
                    <Navbar/>
                </div>

                <div className="col-12 col-md-10">
                    <div className="wd-width-95">
                        <div className="wd-bg-color-black">
                            <AlbumDetails album={album}/>
                        </div>
                    </div>
                </div>
            </div> :
            <div>Loading...</div>
    )

}

export default Details;