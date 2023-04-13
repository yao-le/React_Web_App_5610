import {getListenerById} from "../../services/user-service";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
// import {getReviewById} from "../../services/review-service";


const OtherProfileScreen = () => {

    // const [user, setUser] = useState({});
    // const [reviews, setReviews] = useState([]);
    //
    // const {userId} = useParams();
    //
    // const fetchUser = async () => {
    //     const user = await getListenerById(userId);
    //     setUser(user);
    // }
    //
    // const fetchReviews = async () => {
    //     if (user.reviews) {
    //         const fetchedReviews = await Promise.all(
    //             user.reviews.map((reviewId) => getReviewById(reviewId))
    //         );
    //         setReviews(fetchedReviews);
    //     }
    // }
    //
    // useEffect(() => {
    //     fetchUser();
    // },[])
    //
    // useEffect(() => {
    //     fetchReviews();
    // }, [user])
    //
    //
    // return (
    //     <div className="container">
    //         <h1>Other Profile Screen</h1>
    //         <h2>{user.username}</h2>
    //         <h2>{user.email}</h2>
    //
    //         <ul>
    //             {reviews.map((review, index) => (
    //                 <li key={index}>{review.text}</li>
    //             ))}
    //         </ul>
    //
    //     </div>

    // )
}
export default OtherProfileScreen;