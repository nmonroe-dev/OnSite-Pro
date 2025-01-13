import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/HospitalPage.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function NearestHospitalPage() {
    const location = useLocation();
    const selectedWell = location.state?.selectedWell;
    const [hospital, setHospital] = useState({ hospitalName: "", hospitalLocation: "" });
    const [address, setAddress] = useState({ lon: "", lat: "" });
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/dashboard");
    };

    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                const token = localStorage.getItem("token");

                
                const response = await axios.get(
                    `https://onsite-pro-backend.onrender.com/user/getwell/${selectedWell}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const hospitalInfo = response.data.hospital;
                setHospital({
                    hospitalName: hospitalInfo.hospitalName,
                    hospitalLocation: hospitalInfo.hospitalLocation,
                });

                
                const addressParts = hospitalInfo.hospitalLocation.split(",");
                const structuredAddress = {
                    street: addressParts[0]?.trim().split(" ").join("+"),
                    city: addressParts[1]?.trim(),
                    state: addressParts[2]?.trim(),
                    zip: addressParts[3]?.trim(),
                    country: addressParts[4]?.trim(),
                };

                const mapResponse = await axios.post(
                    "https://onsite-pro-backend.onrender.com/user/map",
                    { hospitalLocation: structuredAddress },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setAddress(mapResponse.data);
            } catch (error) {
                console.error("Unable to fetch hospital or map data:", error);
            }
        };

        fetchHospitalData();
    }, [selectedWell]);

    return (
        <div className="hospital-page-container">
            <div className="hospital-details">
                <h1>{hospital.hospitalName || "Loading Hospital..."}</h1>
                <p>{hospital.hospitalLocation || "Fetching location details..."}</p>
            </div>
            {address.lat && address.lon ? (
                <MapContainer
                    center={[Number(address.lat), Number(address.lon)]}
                    zoom={13}
                    className="leaflet-container"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[Number(address.lat), Number(address.lon)]}>
                        <Popup>
                            Nearest Hospital: {hospital.hospitalName}
                        </Popup>
                    </Marker>
                </MapContainer>
            ) : (
                <p>Loading map...</p>
            )}
            <button onClick={handleBackToHome}>Back to Dashboard</button>
        </div>
    );
}

export default NearestHospitalPage;
