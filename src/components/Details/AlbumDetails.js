import {getAlbumById} from '../../services/album-service';
import {useEffect, useState} from 'react';
import '../../style/details-style.css';
import TrackItem from './TrackItem';
import ReviewForm from "../Review/ReviewForm";
import {createReview} from "../../services/review-service";
import {updateUserReviews} from "../../services/user-service";


const AlbumDetails = ({albumId}) => {
    const [album, setAlbum] = useState(null);


    // need to be modified
    const submitReview = async (reviewText) => {
        console.log("Submit review: ", reviewText);
        // implement review submission logic. Need to call local API to create a review
        // const newReview = {
        //     albumId,
        //     userId: "643804088859bb18110f5e4e", // hard coded for testing, should use thunk to get user id
        //     text: reviewText,
        // }
        // const res = await createReview(newReview);
        // console.log("create review success ", res);
        // await updateUserReviews("643804088859bb18110f5e4e", {reviewId: res._id});
        // console.log("update User reviews success ");
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
        <div className="wd-details mt-5">
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
                    </div>
                </div>
            </div>

            {/*Review Form*/}
            <div>
                <ReviewForm submitReview={submitReview}/>
            </div>

            {/*Track List*/}
            <div className="wd-details-tracks mt-5">
                <ul>
                    {album.tracks.items.map((track) => (
                        <TrackItem key={track.id} track={track}/>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default AlbumDetails;
