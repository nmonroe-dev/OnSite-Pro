import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/DashboardPage.css";
import axios from "axios";

function DashboardPage() {
    const [wells, setWells] = useState([]);
    const [selectedWell, setSelectedWell] = useState("");
    const location = useLocation();
    const [role, setRole] = useState(location.state?.role || "");
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const hospital = location.state?.hospital;
    const navigate = useNavigate();

    const addWell = () => {
        if (role === "admin") {
            navigate("/addWellPage");
        } else {
            alert("Access denied. Only admins can add wells.");
        }
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://onsite-pro-backend.onrender.com/user/userDetail", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsername(response.data.username);
                setUserId(response.data.id);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        const fetchWells = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://onsite-pro-backend.onrender.com/user/wells", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setWells(response.data);
            } catch (error) {
                console.error("Unable to load wells", error);
            }
        };

        fetchUserDetails();
        fetchWells();
    }, []);

    const features = [
        { label: "Check In", icon: "fas fa-sign-in-alt" },
        { label: "Check Out", icon: "fas fa-sign-out-alt" },
        { label: "Incident Report", icon: "fas fa-file-alt" },
        { label: "Nearest Hospital", icon: "fas fa-hospital" },
        { label: "Well Directions", icon: "fas fa-map-signs" },
        { label: "Emergency", icon: "fas fa-exclamation-triangle" },
        { label: "JSA Signing", icon: "fas fa-signature" },
        { label: "Other Features", icon: "fas fa-cogs" },
    ];

    const featureHandlers = {
        "Check In": async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(
                    `https://onsite-pro-backend.onrender.com/user/${selectedWell}/checkin`,
                    { userId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert("Check In successful!");
            } catch (error) {
                alert("Failed to check in. Please try again.");
            }
        },
        "Check Out": async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(
                    `https://onsite-pro-backend.onrender.com/user/${selectedWell}/checkout`,
                    { userId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert("Check Out successful!");
            } catch (error) {
                alert("Failed to check out. Please try again.");
            }
        },
        "Incident Report": () => navigate("/incidentReportFormPage", { state: { selectedWell } }),
        "Nearest Hospital": () => navigate("/hospitalPage", { state: { selectedWell } }),
        "Well Directions": () => navigate("/wellLocationPage", { state: { selectedWell } }),
        "Emergency": () => navigate("/emergencyPage", { state: { selectedWell } }),
        "JSA Signing": () => navigate("/viewjsa", { state: { selectedWell } }),
        "Other Features": () => navigate("/otherFeaturePage", { state: { selectedWell } }),
    };

    const handleSelectWell = (e) => {
        setSelectedWell(e.target.value);
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <div className="logo-container">
                    <img src="/assets/logo.png" alt="On-Site Pro Logo" />
                </div>
                <h1>Welcome, {username}</h1>
                <div className="select-well">
                    <label htmlFor="well-dropdown">Select Well:</label>
                    <select id="well-dropdown" value={selectedWell} onChange={handleSelectWell}>
                        <option value="">-- Choose a Well --</option>
                        {wells.map((well) => (
                            <option key={well._id} value={well._id}>
                                {well.wellName}
                            </option>
                        ))}
                    </select>
                    <button onClick={addWell}>Add Well</button>
                </div>
            </div>
            <div className="dashboard-block">
                {selectedWell === "" ? (
                    <div className="welcome-message">
                        <h2>Welcome to On-Site Pro</h2>
                        <p>Please pick a well to get started.</p>
                    </div>
                ) : (
                    <div className="action-buttons">
                        {features.map((feature, index) => (
                            <div key={index} className="action-button">
                                <button onClick={() => featureHandlers[feature.label]()}>
                                    <i className={feature.icon}></i>
                                </button>
                                <p>{feature.label}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
