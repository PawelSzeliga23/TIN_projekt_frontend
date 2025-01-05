import React, {useState} from 'react';
import {refreshAccessToken} from "../../Hooks/RefreshToken"
import {useTranslation} from "react-i18next";
import "./RegionList.css"
import {useFetchRegions} from "../../Hooks/FetchCommands";

const RegionList = () => {
    const {regions, setRegions} = useFetchRegions();
    const [showModal, setShowModal] = useState(false);
    const [newRegionNames, setNewRegionNames] = useState({
        namePl: '',
        nameEn: ''
    });
    const token = localStorage.getItem("accessToken");
    const {t, i18n} = useTranslation();

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://localhost:5001/api/Region/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 401) {
                const success = await refreshAccessToken();
                if (success) {
                    return;
                } else {
                    console.error("Authorization error")
                }
            }
            setRegions(regions.filter((region) => region.id !== id));
        } catch (error) {
            console.error('Error occurs while deleting:', error);
        }
    };

    const handleAddRegion = async () => {
        try {
            const response = await fetch("https://localhost:5001/api/Region", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newRegionNames)
            });

            if (response.status === 401) {
                const success = await refreshAccessToken();
                if (success) {
                    return handleAddRegion();
                } else {
                    console.error("Authorization error")
                }
            } else if (response.ok) {
                const addedRegion = await response.json();
                setRegions([...regions, addedRegion]);
                setShowModal(false);
                setNewRegionNames({namePl: '', nameEn: ''});
            } else {
                console.error('Błąd dodawania regionu');
            }
        } catch (error) {
            console.error('Błąd:', error);
        }
    };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewRegionNames((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return (
        <div className="region-container">
            <div className="region-card">
                <h2>{t("regionList")}</h2>
                <ul className="region-list">
                    {regions.map((region) => (
                        <li key={region.id}>

                            {i18n.language === "en" ? region.nameEn : region.namePl}

                            <button
                                className="region-button"
                                onClick={() => handleDelete(region.id)}
                            >
                                <span className="material-symbols-outlined">
                                delete
                                </span>
                                {t("delete")}
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    className="add-region-button"
                    onClick={() => setShowModal(true)}
                >
                    <span className="material-symbols-outlined">
                    add
                    </span>
                    {t("addRegion")}
                </button>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>{t("addRegion")}</h3>
                            <input
                                type="text"
                                name="namePl"
                                placeholder={t("namePl")}
                                value={newRegionNames.namePl}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="nameEn"
                                placeholder={t("nameEn")}
                                value={newRegionNames.nameEn}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleAddRegion}>{t("add")}</button>
                            <button onClick={() => setShowModal(false)}>{t("cancel")}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegionList;
