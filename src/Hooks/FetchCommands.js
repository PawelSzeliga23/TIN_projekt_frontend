import {useState, useEffect} from "react";
import {refreshAccessToken} from "./RefreshToken";

export const useFetchPersonalSummits =
    (shouldFetch) => {
        const [personalSummits, setPersonalSummits] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const token = localStorage.getItem("accessToken");

        useEffect(() => {
            if (!shouldFetch) return;
            const fetchSummits = async () => {
                try {
                    const response = await fetch('https://localhost:5001/api/PersonalSummitList', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept-Charset': 'utf-8',
                                "Authorization": `Bearer ${token}`,
                            }
                        }
                    );
                    if (response.status === 401) {
                        const success = await refreshAccessToken();
                        if (success) {
                            return fetchSummits();
                        } else {
                            throw new Error("Authorization error")
                        }
                    } else if (response.ok) {
                        const data = await response.json();
                        setPersonalSummits(data);
                    } else {
                        throw new Error("Error fetching personal summits");
                    }
                } catch
                    (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchSummits()
        }, [shouldFetch, token]);

        return {personalSummits, setPersonalSummits, isLoading, error,};
    }


export const useFetchRegions = () => {
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await fetch("https://localhost:5001/api/Region", {
                    method: "GET",
                    headers: {
                        'Accept': '*/*',
                        "Content-Type": "application/json",
                        'Accept-Charset': 'utf-8',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRegions(data);
            } catch (error) {
                console.error("Error while getting regions", error.message);
            }
        };
        fetchRegions();
    }, []);

    return {regions, setRegions};
};

export const useFetchSummits = (region) => {
    const [summits, setSummits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let url = `https://localhost:5001/api/Summit/region?regionId=${region}`;

    if (!region || region === "all") {
        url = `https://localhost:5001/api/Summit`;
    }

    useEffect(() => {
        const fetchSummits = async () => {
            try {
                const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept-Charset': 'utf-8',
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error('Error during data fetch');
                }
                const data = await response.json();
                setSummits(data);
            } catch
                (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSummits()
    }, [url]);

    return {summits, setSummits, isLoading, error,};
};

export const useFetchSummitDetail = (id) => {
    const [summit, setSummit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummits = async () => {
            try {
                const response = await fetch(`https://localhost:5001/api/Summit/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept-Charset': 'utf-8',
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error('Error during data fetch');
                }
                const data = await response.json();
                setSummit(data);
            } catch
                (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSummits()
    }, [id]);

    return {summit, isLoading, error,};
};
export const useFetchReviewsBySummitId = (id) => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`https://localhost:5001/api/Review/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept-Charset': 'utf-8',
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error('Error during data fetch');
                }
                const data = await response.json();
                setReviews(data);
            } catch
                (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReviews();
    }, [id]);

    return {reviews, setReviews, isLoading, error,};
};


