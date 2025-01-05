import './ReviewListItem.css';
import React from "react";
import {useTranslation} from "react-i18next";

const ReviewsListItem = ({id, date, userName, title, body}) => {
    const {i18n} = useTranslation();
    var formattedDate;
    if (i18n.language === "pl"){
        formattedDate = new Date(date).toLocaleDateString("pl-PL");
    }else {
        formattedDate = new Date(date).toLocaleDateString("en-US");
    }

    return (
        <div className="review-container">
            <div className="review-head">
                <div className="review-userName">
                    <span className="material-symbols-outlined">
                            account_circle
                    </span>
                    {userName}, {formattedDate}
                </div>
            </div>
            <div className="review-title">
                {title}
            </div>
            <div className="review-body">
                {body}
            </div>
        </div>
    );
}
export default ReviewsListItem;