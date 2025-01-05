import {useFetchSummitDetail} from "../../Hooks/FetchCommands";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import "./Summit.css"
import {useLocation, useParams} from "react-router-dom";
import Reviews from "../Reviews/Reviews";

const Summit = () => {
    const {id} = useParams();
    const {summit, isLoading, error} = useFetchSummitDetail(id);
    const {t, i18n} = useTranslation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const role = queryParams.get("role");

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % summit.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? summit.images.length - 1 : prevIndex - 1
        );
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };


    if (isLoading) {
        return (
            <div>Loading</div>
        );
    }
    if (error) {
        return (
            <div>Error: {error}</div>
        );
    }

    return (
        <div>
            <div className="summit-container">
                <div className="summit-left">
                    <div className="imageContainer">
                        <div
                            className="image-desc">{i18n.language === "en" ? summit.images[currentImageIndex].nameEn : summit.images[currentImageIndex].namePl}</div>
                        <button onClick={handlePrevImage} className="prev-btn">
                            <span className="material-symbols-outlined">
                        chevron_left
                        </span>
                        </button>
                        <button onClick={handleNextImage} className="next-btn"><span
                            className="material-symbols-outlined">
                        chevron_right
                        </span></button>
                        <img
                            src={summit.images[currentImageIndex].imageUrl}
                            alt={summit.images[currentImageIndex].nameEn}
                            className="summit-image"
                            onClick={openPopup}
                        />
                    </div>
                </div>
                <div className="summit-right">
                    <div className="head">
                        <h1>{summit.name}</h1>
                        <h3>{t("height")} : {summit.height} m</h3>
                        <h3>Region : {i18n.language === "en" ? summit.regionNameEn : summit.regionNamePl}</h3>
                    </div>
                    <div className="content">
                        <p>
                            {i18n.language === "en" ? summit.descEn : summit.descPl}
                        </p>
                        <p>
                            <a href={`https://${i18n.language}.wikipedia.org/wiki/${summit.name}`} className="wiki-link"
                               rel="noreferrer" target="_blank">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/220px-Wikipedia-logo-v2.svg.png"
                                    alt="wikipedia-logo"
                                    className="wiki-logo"/>
                                {t("moreInfo")}
                            </a>
                        </p>
                    </div>
                    <div className="button-container">

                    </div>
                </div>
                {isPopupOpen && (
                    <div className="popup-overlay" onClick={closePopup}>
                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-btn" onClick={closePopup}>
                                <span
                                    className="material-symbols-outlined">
                                close
                                </span>
                            </button>
                            <img
                                src={summit.images[currentImageIndex].imageUrl}
                                alt={summit.images[currentImageIndex].nameEn}
                                className="popup-image"
                            />
                        </div>
                    </div>
                )}
            </div>
            <Reviews role={role} summitId={id}/>
        </div>
    );
}
export default Summit;