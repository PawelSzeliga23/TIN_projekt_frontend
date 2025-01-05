export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
        const res = await fetch("https://localhost:5001/api/refresh", {
            method: "POST",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({refreshToken}),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            return true;
        } else {
            console.error('Failed to refresh token:', res.status);
        }
    } catch (error) {
        console.error("Błąd odświeżania tokena", error);
    }

    return false;
};

