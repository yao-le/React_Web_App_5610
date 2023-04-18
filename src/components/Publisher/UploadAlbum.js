import React, {useRef, useState} from "react";
import "../../style/login-screen.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {createLocalAlbum} from "../../services/album-service";
import {createLocalTrack} from "../../services/track-service";
import UploadImage from "../LogIn/UploadImage";
import {useNavigate} from "react-router";


const UploadAlbum = () => {

    const {currentUser} = useSelector((state) => state.user);

    const [album, setAlbum] = useState({
        albumName: "",
        coverPic: "",
        description: "",
    });

    const [tracks, setTracks] = useState([]);

    const navigate = useNavigate();


    const addTrack = () => {
        setTracks([
            ...tracks,
            {
                trackName: "",
                duration: "",
            },
        ]);
    };

    const deleteTrack = () => {
        if (tracks.length > 0) {
            setTracks(tracks.slice(0, tracks.length - 1));
        }
    };


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


    // handle image upload, need modification?
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

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Process the form data and make API calls to upload the album
        const albumData = {
            ...album,
            publisher: currentUser._id,
            publisherName: currentUser.name,
            totalTracks: tracks.length
        };
        const newAlbum = await createLocalAlbum(albumData);
        const responses = tracks.map(async (track) => {
            const trackData = {...track, album: newAlbum._id, artistName: currentUser.username};
            return await createLocalTrack(trackData);
        });
        const newTracks = await Promise.all(responses);
        console.log(newTracks)
        navigate("/publisher");
    };

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
                        isSquare={true}
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
                            value={album.name}
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
                                value={track.name}
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
                        <button
                            type="button"
                            onClick={addTrack}
                            className="btn btn-success"
                        >
                            Add Track
                        </button>

                        <button
                            type="button"
                            onClick={deleteTrack}
                            className="btn btn-danger ms-2"
                        >
                            Delete Track
                        </button>


                        <button type="submit" className="btn btn-success ms-4">
                            Submit
                        </button>
                        <Link to="/publisher" className="btn btn-primary ms-2">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default UploadAlbum;