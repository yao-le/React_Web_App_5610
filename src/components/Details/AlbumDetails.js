import {getAlbumById} from '../../services/album-service';
import {useEffect, useState} from 'react';
import '../../style/details-style.css';
import TrackItem from './TrackItem';
import ReviewForm from "../Review/ReviewForm";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";


const AlbumDetails = ({albumId}) => {
    const [album, setAlbum] = useState(null);

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    // handle click on the heart button
    const handleLikeClick = () => {
        if (!currentUser) {
            alert("Please login first");
            navigate("/login");
        }
        console.log("like an album");
        // implement collect logic

    }


    // need to be modified
    const submitReview = async (reviewText) => {
        console.log("Submit review: ", reviewText);

    };


    const fetchAlbumInfo = async () => {
        const albumInfo = await getAlbumById(albumId);
        setAlbum(albumInfo);
    };

    useEffect(() => {
        fetchAlbumInfo();
    },[]);


    if (!album) {
        return <div>Loading album details...</div>;
    }

    return (
        <div className="wd-details mt-5 container">
            <div className="wd-details-header">
                {/*cover image of album*/}
                <img
                    className="wd-details-img"
                    src={album.images[0]?.url}
                    alt={album.name}
                />

                {/*details of album*/}
                <div className="wd-details-info ms-4">
                    <div className="mb-2 text-uppercase fw-bold text-muted">
                        {album.type}
                    </div>
                    <div className="wd-details-title text-uppercase">{album.name}</div>
                    <p className="wd-details-artist fw-bold text-muted">
                        {album.artists.map((artist, index) => (
                            <span key={artist.id}>
                                {artist.name}
                                {index !== album.artists.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </p>
                    <div className="wd-details-meta fw-bold text-muted fs-6 mt-2">
                        <span className="wd-details-release-date">
                            {album.release_date}
                        </span>
                        <span className="wd-details-total-tracks ms-3">
                            {album.tracks.items.length} Songs
                        </span>

                        {/*collect the album*/}
                        <i className="bi bi-heart-fill ms-3 fs-4 wd-bookmark"
                        onClick={handleLikeClick}>
                        </i>
                    </div>
                </div>
            </div>

            {/*Review Form*/}
            <div>
                <ReviewForm submitReview={submitReview}/>
            </div>

            {/*Track List*/}
            <div className="wd-details-tracks mt-5">

                    {album.tracks.items.map((track) => (
                        <TrackItem key={track.id} track={track}/>
                    ))}

            </div>

        </div>
    );
};

export default AlbumDetails;
