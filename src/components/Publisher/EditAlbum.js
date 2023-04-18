import {useNavigate, useParams} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import {getLocalAlbumById, updateLocalAlbum} from "../../services/album-service";
import {getTracksByAlbumId, updateLocalTrack} from "../../services/track-service";
import UploadImage from "../LogIn/UploadImage";
import {Link} from "react-router-dom";

const EditAlbum = () => {

    const { albumId } = useParams(); // local album id

    const [album, setAlbum] = useState();
    const [tracks, setTracks] = useState([]);

    const isAlbum = true;
    const navigate = useNavigate();

    const fetchAlbum = async () => {
        // fetch album from database
        const fetchedAlbum = await getLocalAlbumById(albumId);
        console.log(fetchedAlbum)
        setAlbum(fetchedAlbum);
    }

    const fetchTracks = async () => {
        const fetchedTracks = await getTracksByAlbumId(albumId);
        console.log(fetchedTracks);
        setTracks(fetchedTracks);
    }

    useEffect(() => {
        fetchAlbum();
        fetchTracks();
    }, []);


    const handleInputChange = (e, index) => {
        const {name, value} = e.target;

        if (name === "albumName"
            || name === "description") {
            setAlbum({
                ...album,
                [name]: value,
            });
        } else {
            const updatedTracks = tracks.map((track, trackIndex) =>
                trackIndex === index ? {...track, [name]: value} : track
            );
            setTracks([...updatedTracks]);
        }
    };

    // handle image upload
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handlePortraitChange = (event) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            setAlbum({...album, coverPic: reader.result}); // base64encoded string
        }
        reader.onerror = (error) => {
            console.log("Error: ", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateLocalAlbum(albumId, album);
            const responses = tracks.map(async (track) => {
                return await updateLocalTrack(track._id, track);
            });
            await Promise.all(responses);
            console.log("album updated");
            navigate(`/details?localAlbum=${albumId}`);
        } catch (err) {
            console.log(err);
            alert("Failed to update album. Try to upload a smaller image.")
        }
    }


    if (!album) {
        return <div>Loading...</div>
    }

    return (
        <div className="wd-login-screen wd-bg-color-black text-white">
            <div className="container mt-5">
                <form onSubmit={handleSubmit} className="p-5 rounded">
                    {/* upload album cover image */}
                    <UploadImage
                        portrait={album.coverPic}
                        fileInputRef={fileInputRef}
                        handlePortraitChange={handlePortraitChange}
                        handleUploadClick={handleUploadClick}
                        isAlbum={isAlbum}
                    />

                    <h2 className="text-center mb-4">Create Album</h2>
                    <div className="form-group">
                        <label htmlFor="albumName" className="mb-2">Album Name</label>
                        <input
                            type="text"
                            id="albumName"
                            name="albumName"
                            placeholder="Album Name"
                            required
                            value={album.albumName}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="mb-2 mt-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Album Description"
                            value={album.description}
                            required
                            onChange={handleInputChange}
                            className="form-control"
                        ></textarea>
                    </div>

                    {tracks.map((track, index) => (
                        <div key={index} className="form-group mb-2 mt-3">
                            <h3>Track {index + 1}</h3>
                            <label htmlFor={`trackName-${index}`} className="mb-2">Name</label>
                            <input
                                type="text"
                                id={`trackName-${index}`}
                                name="trackName"
                                placeholder="Track Name"
                                value={track.trackName}
                                onChange={(e) => handleInputChange(e, index)}
                                className="form-control"
                            />
                            <label htmlFor={`duration-${index}`} className="mt-2 mb-2">
                                Duration
                            </label>
                            <input
                                type="text"
                                id={`duration-${index}`}
                                name="duration"
                                placeholder="track duration, e.g. 3:45"
                                value={track.duration}
                                onChange={(e) => handleInputChange(e, index)}
                                className="form-control"
                            />
                        </div>
                    ))}

                    <div className="d-flex flex-row justify-content-end mt-3">

                        <button type="submit" className="btn btn-success ms-4">
                            Update
                        </button>
                        <Link to={`/details?localAlbum=${albumId}`} className="btn btn-primary ms-2">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditAlbum;