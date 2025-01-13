import "../styles/AddWellPage.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddWellPage() {
    const [wellName, setName] = useState("");
    const [wellLocation, setLocation] = useState("");
    const [hospital, setHospital] = useState({ hospitalName: "", hospitalLocation: "" });
    const [emergencyContacts, setEmergencyContacts] = useState([
        { contactName: "", contactNumber: "", contactPosition: "" }
    ]);
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedContacts = [...emergencyContacts];
        updatedContacts[index][field] = value;
        setEmergencyContacts(updatedContacts);
    };

    const addContactInput = () => {
        setEmergencyContacts([...emergencyContacts, { contactName: "", contactNumber: "", contactPosition: "" }]);
    };

    const addWellInfo = async (event) => {
        event.preventDefault();

        const wellData = { wellName, wellLocation, hospital, emergencyContacts };

        try {
            const response = await axios.post(
                "http://localhost:4004/user/well",
                wellData,
                config
            );

            alert("Well submitted successfully!");
            setName("");
            setLocation("");
            setHospital({ hospitalName: "", hospitalLocation: "" });
            setEmergencyContacts([{ contactName: "", contactNumber: "", contactPosition: "" }]);

            navigate("/dashboard");
        } catch (error) {
            console.error("Unable to post well data", error);
            alert("Failed to upload well data. Please try again. All fields required.");
        }
    };

    return (
        <div className="addWellPage-container">
            <h1>Add a New Well</h1>
            <form onSubmit={addWellInfo}>
                <div className="form-group">
                    <label htmlFor="wellName">Well Name</label>
                    <input
                        type="text"
                        id="wellName"
                        placeholder="Enter Well Name"
                        required
                        value={wellName}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <textarea
                        type="text"
                        id="location"
                        placeholder="Enter Location"
                        required
                        value={wellLocation}
                        onChange={(event) => setLocation(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hospital">Nearest Hospital</label>
                    <input
                        type="text"
                        placeholder="Enter Nearest Hospital Name"
                        required
                        value={hospital.hospitalName}
                        onChange={(event) => setHospital({ ...hospital, hospitalName: event.target.value })}
                    />
                    <label>Enter the full address</label>
                    <input
                        type="text"
                        placeholder="e.g., 123 Main St, New York, NY, 10001, USA"
                        required
                        value={hospital.hospitalLocation}
                        onChange={(event) => setHospital({ ...hospital, hospitalLocation: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Emergency Contacts</label>
                    {emergencyContacts.map((contact, index) => (
                        <div key={index} className="contact-input-group">
                            <input
                                type="text"
                                placeholder="Contact Name"
                                value={contact.contactName}
                                onChange={(event) =>
                                    handleInputChange(index, "contactName", event.target.value)
                                }
                            />
                            <input
                                type="text"
                                placeholder="Contact Number"
                                value={contact.contactNumber}
                                onChange={(event) =>
                                    handleInputChange(index, "contactNumber", event.target.value)
                                }
                            />
                            <input
                                type="text"
                                placeholder="Contact Position"
                                value={contact.contactPosition}
                                onChange={(event) =>
                                    handleInputChange(index, "contactPosition", event.target.value)
                                }
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addContactInput}>
                        Add Another Contact
                    </button>
                </div>
                <div className="form-group">
                    <button type="submit">Add Well</button>
                </div>
            </form>
        </div>
    );
}

export default AddWellPage;
