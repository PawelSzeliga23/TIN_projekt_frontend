import React, {useState} from 'react';
import ReactPaginate from 'react-paginate';
import "./SummitList.css"
import SummitListItem from "./SummitListItem";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useFetchPersonalSummits, useFetchRegions, useFetchSummits} from "../../Hooks/FetchCommands";
import {refreshAccessToken} from "../../Hooks/RefreshToken";

const SummitList = ({role}) => {
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    let {summits, setSummits, isLoading, error} = useFetchSummits(selectedRegion);
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const {regions} = useFetchRegions();
    const token = localStorage.getItem("accessToken");
    const {personalSummits, setPersonalSummits} = useFetchPersonalSummits(role === "user")
    const screenWidth = window.innerWidth - 60;

    //*2 for better design
    const itemsPerPage = Math.floor(screenWidth/280);

    const filteredSummits = summits.filter((summit) =>
        summit.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastSummit = (currentPage + 1) * itemsPerPage;
    const indexOfFirstSummit = indexOfLastSummit - itemsPerPage;
    const currentSummits = filteredSummits.slice(
        indexOfFirstSummit,
        indexOfLastSummit
    );

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    };
    const navigateToForm = () => {
        navigate("/summit/form");
    }

    if (isLoading) return <div className="information">Loading...</div>;
    if (error) return <div className="information">Error: {error}</div>;

    const handleRegionSearch = (event) => {
        const regionId = event.target.value;
        setSelectedRegion(regionId);
    }

    const handleSummitDelete = async (id) => {
        try {
            const response = await fetch(`https://localhost:5001/api/Summit/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (response.status === 401) {
                const success = await refreshAccessToken();
                if (success) {
                    return handleSummitDelete();
                } else {
                    console.error("Authorization error");
                }
            } else if (response.ok) {
                setSummits((prevSummits) => prevSummits.filter((summit) => summit.id !== id));
            } else {
                console.error("Error fetching summit details");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            {role === "admin" && (<button onClick={navigateToForm} className="add-summit">{t("addSummit")}</button>)}
            <div className="summit-list">
                <div className="summit-form-group">
                    <label>Region :</label>
                    <select onChange={handleRegionSearch}>
                        <option value="all">All</option>
                        {regions.map((region) => (
                            <option key={region.id} value={region.id}>
                                {i18n.language === "en" ? region.nameEn : region.namePl}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="summit-form-group">
                    <input
                        type="text"
                        placeholder={t("searchSum")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-bar"
                    />
                </div>
            </div>
            <div>
                {filteredSummits.length === 0 && (<div className="information">There is no such summit</div>)}
                <ul className="list">
                    {currentSummits.map((summit) => (
                        <li key={summit.id} className="fade-in"><SummitListItem id={summit.id} name={summit.name}
                                                                                height={summit.height}
                                                                                images={summit.images}
                                                                                role={role}
                                                                                handleDelete={() => handleSummitDelete(summit.id)}
                                                                                personalList={personalSummits}
                                                                                setPersonalSummit={setPersonalSummits}
                        /></li>
                    ))}
                </ul>
            </div>
            <div className="summit-list-pagination">
                <ReactPaginate
                    previousLabel={t("prev")}
                    nextLabel={t("next")}
                    breakLabel={"..."}
                    pageCount={Math.ceil(filteredSummits.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
};

export default SummitList;
