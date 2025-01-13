import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/JsaPage.css";
import { useLocation, useNavigate } from "react-router-dom";

function JsaPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedWell = location.state?.selectedWell;
    const [jsaFile, setJsaFile] = useState(null);
    const [acknowledgmentStatus, setAcknowledgmentStatus] = useState("");

    
    useEffect(() => {
        const fetchJsaFile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `https://onsite-pro-backend.onrender.com/user/${selectedWell}/jsa`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setJsaFile(response.data);
            } catch (error) {
                console.error("Error fetching JSA file:", error);
            }
        };

        fetchJsaFile();
    }, [selectedWell]);

    
    const handleAcknowledge = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `https://onsite-pro-backend.onrender.com/user/${selectedWell}/acknowledgeJsa`,
                { userId: localStorage.getItem("userId") }, // Assuming user ID is stored
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setAcknowledgmentStatus("Acknowledgment recorded successfully!");
        } catch (error) {
            console.error("Error acknowledging JSA:", error);
            setAcknowledgmentStatus("Failed to record acknowledgment. Try again.");
        }
    };

    
    const handleBackToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="jsa-page-container">
            <h1>Job Safety Analysis (JSA)</h1>
            {jsaFile ? (
                <div className="jsa-content">
                    <p><strong>File Name:</strong> {jsaFile.filename}</p>
                    <img
                        src={`https://onsite-pro-backend.onrender.com${jsaFile.filepath}`}
                        alt="JSA"
                        className="jsa-image"
                    />
                </div>
            ) : (
                <p>No JSA image available for this well.</p>
            )}
            <button onClick={handleAcknowledge}>I Acknowledge</button>
            {acknowledgmentStatus && <p className="acknowledgment-message">{acknowledgmentStatus}</p>}
            <button className="back-button" onClick={handleBackToDashboard}>Back to Dashboard</button>
        </div>
    );
}

export default JsaPage;
