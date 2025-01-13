import { useState } from "react";
import "../styles/IncidentReportForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function IncidentReportForm() {
    const [incidentTitle, setIncidentTitle] = useState("");
    const [incidentDescription, setIncidentDescription] = useState("");
    const [reportedBy, setReportedBy] = useState("");
    const [incidentDate, setIncidentDate] = useState("");
    const location = useLocation();
    const [selectedWell, setSelectedWell] = useState(location.state?.selectedWell);
    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const incidentData = {
            title: incidentTitle,
            description: incidentDescription,
            reportedBy,
            date: incidentDate,
        };

        try {
            const response = await axios.post(
                `http://localhost:4004/user/${selectedWell}/incident`,
                incidentData,
                config
            );
            alert("Incident report submitted successfully!");
            setIncidentTitle("");
            setIncidentDescription("");
            setReportedBy("");
            setIncidentDate("");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error submitting incident report:", error);
            alert("Failed to submit the incident report. Please try again.");
        }
    };

    return (
        <div className="incident-form-container">
            <h1>Incident Report Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="incidentTitle">Incident Title</label>
                    <input
                        type="text"
                        id="incidentTitle"
                        placeholder="Enter the title of the incident"
                        value={incidentTitle}
                        onChange={(e) => setIncidentTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="incidentDescription">Description</label>
                    <textarea
                        id="incidentDescription"
                        placeholder="Provide a detailed description"
                        value={incidentDescription}
                        onChange={(e) => setIncidentDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="reportedBy">Reported By</label>
                    <input
                        type="text"
                        id="reportedBy"
                        placeholder="Enter your name"
                        value={reportedBy}
                        onChange={(e) => setReportedBy(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="incidentDate">Incident Date</label>
                    <input
                        type="date"
                        id="incidentDate"
                        value={incidentDate}
                        onChange={(e) => setIncidentDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Submit Report</button>
                </div>
            </form>
        </div>
    );
}

export default IncidentReportForm;
