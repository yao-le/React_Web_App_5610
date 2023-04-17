import {useRef, useState} from "react";
import "../../style/login-screen.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {createLocalAlbum} from "../../services/album-service";
import {createLocalTrack} from "../../services/track-service";


const UploadAlbum = () => {

    const { currentUser } = useSelector((state) => state.user);

    const [album, setAlbum] = useState({
        albumName: "",
        coverPic: "",
        description: "",
    });

    const [tracks, setTracks] = useState([]);


    const addTrack = () => {
        setTracks([
            ...tracks,
            {
                trackName: "",
                duration: "",
            },
        ]);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;

        if (name === "albumName"
            || name === "description") {
            setAlbum({
                ...album,
                [name]: value,
            });
        } else {
            const updatedTracks = tracks.map((track, trackIndex) =>
                trackIndex === index ? { ...track, [name]: value } : track
            );
            setTracks([...updatedTracks]);
        }
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setAlbum({
                ...album,
                coverPic: imageUrl
            });
        }

    };

    // handle image upload, need modification?
    // const fileInputRef = useRef(null);
    // const handleUploadClick = () => {
    //     fileInputRef.current.click();
    // };
    //
    // const handlePortraitChange = (event) => {
    //     // if (event.target.files && event.target.files[0]) {
    //     //     const imageUrl = URL.createObjectURL(event.target.files[0]);
    //     //     setPortrait(imageUrl);
    //     // }
    //     const reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]);
    //     reader.onload = () => {
    //         setPortrait(reader.result); // base64encoded string
    //     }
    //     reader.onerror = (error) => {
    //         console.log("Error: ", error);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Process the form data and make API calls to upload the album
        const albumData = {...album, publisher: currentUser._id, totalTracks: tracks.length};
        const newAlbum = await createLocalAlbum(albumData);

        const responses = tracks.map(async (track) => {
            const trackData = {...track, album: newAlbum._id, artistName: currentUser.username};
            return await createLocalTrack(trackData);
        });
        const newTracks = await Promise.all(responses);
        console.log(newTracks)
    };

    return (
        <div className="wd-login-screen wd-bg-color-black text-white">
        <div className="container text-center mt-5">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="albumName">Album Name:</label>
                    <input
                        type="text"
                        id="albumName"
                        name="albumName"
                        value={album.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Album Name:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={album.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="coverPic">Cover Image:</label>
                    <input
                        type="file"
                        id="coverPic"
                        name="coverPic"
                        onChange={handleFileChange}
                    />
                </div>

                {tracks.map((track, index) => (
                    <div key={index}>
                        <h3>Track {index + 1}</h3>
                        <label htmlFor={`trackName-${index}`}>Track Name:</label>
                        <input
                            type="text"
                            id={`trackName-${index}`}
                            name="trackName"
                            value={track.name}
                            onChange={(e) => handleInputChange(e, index)}
                        />
                        <label htmlFor={`duration-${index}`}>Duration:</label>
                        <input
                            type="text"
                            id={`duration-${index}`}
                            name="duration"
                            value={track.duration}
                            onChange={(e) => handleInputChange(e, index)}
                        />
                    </div>
                ))}

                <button type="button" onClick={addTrack}>
                    Add Track
                </button>
                <button type="submit">Submit</button>
                <Link to="/publisher">Cancel</Link>
            </form>
        </div>
        </div>
    );

}

export default UploadAlbum;