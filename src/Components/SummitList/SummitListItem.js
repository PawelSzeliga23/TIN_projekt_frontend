import {useState} from "react";
import {useTranslation} from "react-i18next";
import './SummitListItem.css'
import {Link} from "react-router-dom";
import {refreshAccessToken} from "../../Hooks/RefreshToken";

const SummitListItem = ({id, name, height, images, role, handleDelete, personalList, setPersonalSummit}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const {t} = useTranslation();
    const token = localStorage.getItem("accessToken");

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleAddToPersonalSummitList = async () => {
        try {
            const response = await fetch("https://localhost:5001/api/PersonalSummitList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "summitId": id,
                    "accessToken": token
                })
            });

            if (response.status === 401) {
                const success = await refreshAccessToken();
                if (success) {
                    return handleAddToPersonalSummitList();
                } else {
                    console.error("Authorization error")
                }
            } else if (response.ok) {
                setPersonalSummit((prevSummits) => {
                    const summitExists = prevSummits.some(s => s.id === id);
                    if (!summitExists) {
                        return [...prevSummits, {id, name, height, images}];
                    }
                    return prevSummits;
                });
            } else {
                console.error('Error during add to personal list');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div className="top">
                    <button onClick={handlePrevImage} className="prev-btn">
                        <span className="material-symbols-outlined">
                        chevron_left
                        </span>
                    </button>
                    <button onClick={handleNextImage} className="next-btn"><span className="material-symbols-outlined">
                        chevron_right
                        </span></button>
                    <img
                        src={images[currentImageIndex].imageUrl}
                        alt={images[currentImageIndex].nameEn}
                        className="product-image-main"
                    />
                </div>
                <div className="bottom">
                    <div className="left">
                        <Link to={`/summit/${id}?role=${role}`} className="unstyled-link">
                            <div className="details">
                                <h2>{name}</h2>
                                <p>{t("height")} : {height} m</p>
                            </div>
                        </Link>
                    </div>
                    <div className="right">
                        {role === "user" && personalList.some(s => s.id === id) && (
                            <div className="full check">
                                <button className="icon-button" disabled="true"><span
                                    className="material-symbols-outlined">
                                check
                                </span></button>
                            </div>
                        )
                        }
                        {role === "del" && (
                            <div className="full delete">
                                <button className="icon-button" onClick={handleDelete}>
                            <span className="material-symbols-outlined">
                            remove
                            </span>
                                </button>
                            </div>
                        )
                        }
                        {role === "user" && !personalList.some(s => s.id === id) && (
                            <div className="full add">
                                <button className="icon-button" onClick={handleAddToPersonalSummitList}><span
                                    className="material-symbols-outlined">
                                add
                                </span></button>
                            </div>
                        )
                        }
                        {role === "admin" && (
                            <div className="top-but edit">
                                <Link to={`/summit/form/update/${id}`}>
                                    <button className="icon-button">
                            <span className="material-symbols-outlined">
                            edit
                            </span>
                                    </button>
                                </Link>
                            </div>)}
                        {role === "admin" && (
                            <div className="bottom-but delete">
                                <button className="icon-button" onClick={handleDelete}>
                            <span className="material-symbols-outlined">
                            delete
                            </span>
                                </button>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default SummitListItem;