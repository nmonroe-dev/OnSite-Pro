import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/EmergencyContactsPage.css";

function EmergencyContactsPage() {
    const [emergencyContacts, setEmergencyContacts] = useState([]);
    const location = useLocation();
    const selectedWell = location.state?.selectedWell;
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/dashboard");
    };


    useEffect(() => {
        const fetchEmergencyContacts = async () => {
            if (!selectedWell) {
                console.error("Selected well is not set");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `https://onsite-pro-backend.onrender.com/user/${selectedWell}/emergencyContacts`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setEmergencyContacts(response.data.contacts);
            } catch (error) {
                console.error("Unable to fetch emergency contacts", error);
            }
        };

        fetchEmergencyContacts();
    }, [selectedWell]);

    return (
        <div className="emergency-contacts-container">
            <h1>Emergency Contacts</h1>
            {emergencyContacts.length > 0 ? (
                <ul>
                    {emergencyContacts.map((contact, index) => (
                        <li key={index}>
                            <strong>Name:</strong> {contact.contactName}
                            <p>
                                <strong>Phone:</strong>{" "}
                                <a href={`tel:${contact.contactNumber}`}>{contact.contactNumber}</a>
                            </p>
                            <strong>Position:</strong> {contact.contactPosition}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading emergency contacts...</p>
            )}
             <button onClick={handleBackToHome}>Back to Dashboard</button>
        </div>
    );
}

export default EmergencyContactsPage;
