import {getAlbumById} from '../../services/album-service';
import {useEffect, useState} from 'react';
import '../../style/details-style.css';
import TrackItem from './TrackItem';
import CommentForm from "../Comment/CommentForm";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {createComment, getCommentForAlbum} from "../../services/comment-service";
import CommentItem from "../Comment/CommentItem";
import BookmarkIcon from "./BookmarkIcon";


const AlbumDetails = ({albumId}) => {
    const [album, setAlbum] = useState(null);

    const [reviews, setReviews] = useState([]);

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();


    const submitReview = async (reviewText) => {
        // log in before submitting review
        if (!currentUser) {
            alert("Please login first");
            navigate("/login");
            return;
        }
        // only logged-in user can submit review
        const newComment = {
            commenter: currentUser._id,
            albumId: albumId,
            content: reviewText,
            albumName: album.name,
        }
        const response = await createComment(newComment);// return a new comment object
        setReviews([response, ...reviews]);
    };


    const fetchAlbumInfo = async () => {
        const albumInfo = await getAlbumById(albumId);
        setAlbum(albumInfo);
    };

    const fetchAlbumReviews = async() => {
        const albumReviews = await getCommentForAlbum(albumId);
        setReviews(albumReviews);
    }


    useEffect(() => {
        fetchAlbumInfo();
        fetchAlbumReviews();
    },[reviews]);


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
                            {album.tracks.items.length} {album.tracks.items.length > 1 ? "Songs" : "Song"}
                        </span>

                        {/*Bookmark icon: used for collecting the album*/}
                        <BookmarkIcon album={album} />
                    </div>
                </div>
            </div>

            {/*Comment Form*/}
            <div>
                <CommentForm submitReview={submitReview} albumId={albumId}/>
            </div>

            {/*Comment from users*/}
            <div className="mt-3">
                {reviews.length === 0 && <h3 className="text-muted">No comments yet</h3>}
                {reviews.length > 0 && <h3 className="text-muted">Comments</h3>}

                <div>
                    {reviews.map((review) => (
                        <CommentItem key={review._id} comment={review}/>
                    ))}
                </div>

            </div>

            {/*Track List*/}
            <div className="wd-details-tracks my-5">
                {album.tracks.items.length > 0 && <h3 className="text-muted">Tracks</h3>}

                {album.tracks.items.map((track) => (
                    <TrackItem key={track.id} track={track}/>
                ))}
            </div>

        </div>
    );
};

export default AlbumDetails;
