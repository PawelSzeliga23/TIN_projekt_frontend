import {useFetchReviewsBySummitId} from "../../Hooks/FetchCommands";
import ReviewsListItem from "./ReviewsListItem";
import "./Reviews.css"
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {refreshAccessToken} from "../../Hooks/RefreshToken";

const Reviews = ({role, summitId}) => {
    const {reviews, setReviews, isLoading, error} = useFetchReviewsBySummitId(summitId);
    const [formData, setFormData] = useState({
        title: "",
        body: ""
    });
    const {t} = useTranslation();
    const accessToken = localStorage.getItem("accessToken");

    const fetchReviews = async (id) => {
        try {
            const response = await fetch(`https://localhost:5001/api/Review/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Charset': 'utf-8',
                },
            });
            if (!response.ok) {
                throw new Error('Error during data fetch');
            }
            return await response.json();
        } catch (error) {
            console.error('Error during fetchReviews:', error);
            return [];
        }
    };

    const addReview = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://localhost:5001/api/Review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    title: formData.title,
                    body: formData.body,
                    summitId: summitId,
                    accessToken: accessToken
                })
            });

            if (response.status === 401) {
                const success = await refreshAccessToken();
                if (success) {
                    return addReview();
                } else {
                    console.error("Authorization error")
                }
            } else if (response.ok) {
                setFormData({
                    title: "",
                    body: ""
                })
                const updatedReviews = await fetchReviews(summitId);
                setReviews(updatedReviews);
                console.log(reviews);
            } else {
                console.error('Error during review add');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="reviews-container">
            <div className="review-top">
                {role === "user" && (
                    <div className="add-review-container">
                        <form onSubmit={addReview} className="review-form">
                            <div className="review-row">
                                <label>
                                    {t("title")} :
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="review-input"
                                />
                                <button type="submit" className="review-submit-button">
                                    {t("add")}
                                </button>
                            </div>
                            <textarea
                                name="body"
                                value={formData.body}
                                onChange={handleChange}
                                required
                                className="review-textarea"
                            />
                        </form>
                    </div>
                )}

            </div>
            <div className="review-bottom">
                <ul className="review-list">
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <ReviewsListItem id={review.id} date={review.date} title={review.title} body={review.body}
                                             userName={review.userName}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Reviews;