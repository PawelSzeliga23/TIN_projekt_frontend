import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import './SummitForm.css';
import {refreshAccessToken} from "../../Hooks/RefreshToken";
import {useFetchRegions} from "../../Hooks/FetchCommands";
import {useParams} from "react-router-dom";

const SummitForm = () => {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        name: "",
        height: 0,
        regionId: 0,
        descPl: "",
        descEn: "",
        images: [{imageUrl: "", namePl: "", nameEn: ""}],
    });
    const {regions} = useFetchRegions();
    const {t, i18n} = useTranslation();
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (id) {
            const fetchSummit = async () => {
                try {
                    const response = await fetch(`https://localhost:5001/api/Summit/update/${id}`, {
                        headers: {
                            "Accept": "*/*",
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    if (response.status === 401) {
                        const success = await refreshAccessToken();
                        if (success) {
                            return fetchSummit();
                        } else {
                            console.error("Authorization error");
                        }
                    } else if (response.ok) {
                        const data = await response.json();
                        setFormData(data);
                    } else {
                        console.error("Error fetching summit details");
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            };

            fetchSummit();
        }
    }, [id, token]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e, index) => {
        const {name, value} = e.target;
        const updatedImages = [...formData.images];
        updatedImages[index][name] = value;
        setFormData((prevData) => ({
            ...prevData,
            images: updatedImages,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = id ? "PUT" : "POST";
        const url = id
            ? `https://localhost:5001/api/Summit/${id}`
            : "https://localhost:5001/api/Summit";

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    'Accept-Charset': 'utf-8',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 401) {
                const success = await refreshAccessToken();
                if (success) {
                    return handleSubmit(e);
                } else {
                    console.error("Authorization error");
                }
            } else if (response.ok) {
                setFormData({
                    name: "",
                    height: 0,
                    regionId: null,
                    descPl: "",
                    descEn: "",
                    images: [],
                });
            } else {
                console.error('Error saving summit');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddImage = () => {
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, {imageUrl: "", namePl: "", nameEn: ""}],
        }));
    };

    const handleRemoveImage = (index) => {
        const imageToRemove = formData.images[index];

        if (!imageToRemove.imageUrl || imageToRemove.imageUrl.trim() === "") {
            return;
        }
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            images: updatedImages,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="summit-form">
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Height:</label>
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Region:</label>
                <select
                    name="regionId"
                    value={formData.regionId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a region</option>
                    {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                            {i18n.language === "en" ? region.nameEn : region.namePl}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Description (PL):</label>
                <textarea
                    name="descPl"
                    value={formData.descPl}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Description (EN):</label>
                <textarea
                    name="descEn"
                    value={formData.descEn}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Images:</label>
                {formData.images.map((image, index) => (
                    <div key={index} className="image-group">
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={image.imageUrl}
                            onChange={(e) => handleImageChange(e, index)}
                            required
                        />
                        <input
                            type="text"
                            name="namePl"
                            placeholder="Image Name (PL)"
                            value={image.namePl}
                            onChange={(e) => handleImageChange(e, index)}
                            required
                        />
                        <input
                            type="text"
                            name="nameEn"
                            placeholder="Image Name (EN)"
                            value={image.nameEn}
                            onChange={(e) => handleImageChange(e, index)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="remove-image-btn"
                        >
                            Remove Image
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddImage} className="add-image-btn">
                    Add Image
                </button>
            </div>

            <button type="submit" className="submit-btn">
                {id ? "Update Summit" : "Create Summit"}
            </button>
        </form>
    );
};

export default SummitForm;
