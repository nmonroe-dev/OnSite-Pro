import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/WellLocationPage.css";

function WellLocationPage() {
    const [wellLocation, setWellLocation] = useState("");
    const location = useLocation();
    const [selectedWell, setSelectedWell] = useState(location.state?.selectedWell);
    const [wellName, setWellName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocation = async () => {
            if (!selectedWell) {
                console.error("Selected well is not set");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:4004/user/getwell/${selectedWell}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const wellData = response.data;
                setWellLocation(wellData.wellLocation);
                setWellName(wellData.wellName);
            } catch (error) {
                console.error("Unable to fetch Location", error);
            }
        };

        fetchLocation();
    }, [selectedWell]);

    return (
        <div className="main-container">
            <h1>{wellName}</h1>
            <div className="location">
                <p>{wellLocation}</p>
            </div>
            <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
        </div>
    );
}

export default WellLocationPage;
