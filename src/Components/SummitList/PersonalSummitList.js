import React from 'react';
import "./SummitList.css"
import SummitListItem from "./SummitListItem";
import {useFetchPersonalSummits} from "../../Hooks/FetchCommands";
import {refreshAccessToken} from "../../Hooks/RefreshToken";


const PersonalSummitList = () => {
    let {personalSummits, setPersonalSummits, isLoading, error} = useFetchPersonalSummits(true);
    const token = localStorage.getItem("accessToken");

    if (isLoading) return <div className="information">Loading...</div>;
    if (error) return <div className="information">Error: {error}</div>;

    if (personalSummits.length === 0){
        return (
            <div className="information">Your personal list is empty add conquered summits in search tab</div>
        );
    }

    const handlePersonalSummitDelete = async (id) => {
        try {
            const response = await fetch(`https://localhost:5001/api/PersonalSummitList`, {
                method: "DELETE",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "summitId": id,
                    "accessToken": token
                })
            });
            if (response.status === 401) {
                const success = await refreshAccessToken();
                if (success) {
                    return handlePersonalSummitDelete();
                } else {
                    console.error("Authorization error");
                }
            } else if (response.ok) {
                setPersonalSummits((prevSummits) => prevSummits.filter((summit) => summit.id !== id));
            } else {
                console.error("Error fetching summit details");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div>
                <ul className="list">
                    {personalSummits.map((summit) => (
                        <li key={summit.id} className="fade-in"><SummitListItem id={summit.id} name={summit.name}
                                                                                height={summit.height}
                                                                                images={summit.images}
                                                                                role="del"
                                                                                handleDelete={() => handlePersonalSummitDelete(summit.id)}
                        /></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PersonalSummitList;
