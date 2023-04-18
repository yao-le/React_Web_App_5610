import {useEffect, useState} from 'react';
import '../../style/details-style.css';
import TrackItem from './TrackItem';
import CommentForm from "../Comment/CommentForm";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {createComment, getCommentForAlbum} from "../../services/comment-service";
import CommentItem from "../Comment/CommentItem";
import BookmarkIcon from "./BookmarkIcon";
import {Link} from "react-router-dom";
import {deleteLocalAlbum} from "../../services/album-service";
import {deleteCollectAlbum} from "../../services/collectAlbums-service";


const AlbumDetails = ({album}) => {

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
            albumId: album.id,
            content: reviewText,
            albumName: album.name,
            isLocal: album.isLocal,
        }
        const response = await createComment(newComment);// return a new comment object
        setReviews([response, ...reviews]);
    };



    const fetchAlbumReviews = async() => {
        const albumReviews = await getCommentForAlbum(album.id);
        setReviews(albumReviews);
    }


    useEffect(() => {
        fetchAlbumReviews();
    },[reviews]);



    const handleDelete = async () => {
        await deleteLocalAlbum(album.id);
        await deleteCollectAlbum(currentUser._id, album.id);

        // deleteAll track
        // delete liketrack relation

        navigate("/publisher");
    }


    if (!album) {
        return <div>Loading album details...</div>;
    }

    return (
        <div className="wd-details mt-5 container">
            <div className="wd-details-header">
                {/*cover image of album*/}
                <img
                    className="wd-details-img"
                    src={album.image}
                    alt={album.name}
                />

                {/*details of album*/}
                <div className="wd-details-info ms-4">
                    <div className="mb-2 text-uppercase fw-bold text-muted">
                        Album
                    </div>
                    <div className="wd-details-title text-uppercase">{album.name}</div>
                    <p className="wd-details-artist fw-bold text-muted">
                        {album.artists}
                    </p>
                    <div className="text-muted">
                        {
                            album.description &&
                            <>
                                <i className="bi bi-star-fill"></i>
                                <span className="wd-details-artist fw-bold ms-2" >{album.description}</span>
                            </>
                        }
                    </div>
                    <div className="wd-details-meta fw-bold text-muted fs-6 mt-2">
                        <span className="wd-details-release-date">
                            {album.releaseDate}
                        </span>
                        <span className="wd-details-total-tracks ms-3">
                            {album.totalTracks} {album.totalTracks > 1 ? "Songs" : "Song"}
                        </span>

                        {/*Bookmark icon: used for collecting the album*/}
                        <BookmarkIcon album={album} />
                    </div>

                    <div>
                        {/*only artists who published the work and administrators can edit and delete*/}
                        {
                            currentUser &&
                            ((album.publisherId && currentUser._id === album.publisherId) || currentUser.role === "admin")
                            &&
                            <>
                                <div className="d-flex flex-row">
                                    {/*TODO: Edit and Delete*/}
                                    <div className="mt-2 fw-bold text-muted">
                                        <Link to={`/edit-album/${album.id}`} className="wd-link-no-decoration">
                                            <i className="bi bi-pencil-square"></i>
                                            <span className="ms-2">Edit</span>
                                        </Link>
                                    </div>


                                    {/*<div className="mt-2 fw-bold text-muted ms-3">*/}
                                    {/*    <i className="bi bi-file-earmark-x-fill"></i>*/}
                                    {/*    <span className="ms-2 wd-cursor-pointer" onClick={handleDelete}>*/}
                                    {/*    Delete*/}
                                    {/*</span>*/}
                                    {/*</div>*/}
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>

            {/*Comment Form*/}
            <div>
                <CommentForm submitReview={submitReview} albumId={album.id}/>
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
                {album.totalTracks > 0 && <h3 className="text-muted">Tracks</h3>}

                {album.tracks.map((track) => (
                    <TrackItem key={track.id} track={track}/>
                ))}
            </div>

        </div>
    );
};

export default AlbumDetails;
