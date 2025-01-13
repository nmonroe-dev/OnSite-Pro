import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CheckInPage.css";
import axios from "axios";

function CheckInPage() {
    const [checkedInUsers, setCheckedInUsers] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const selectedWell = location.state?.selectedWell;

    const buttonClick = () => {
        navigate("/dashboard");
    };

    useEffect(() => {
        const getCheckedInUsers = async () => {
            if (!selectedWell) {
                console.error("Selected well is not set");
                return;
            }

            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:4004/user/${selectedWell}/checkedInUsers`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCheckedInUsers(response.data);
            } catch (error) {
                console.error("Unable to fetch checked-in users:", error);
            }
        };

        getCheckedInUsers();
    }, [selectedWell]);

    return (
        <div className="checkin-page-container">
            <h1>Checked-In Users</h1>
            <div className="users-list">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Check-In Time</th>
                            <th>Well Name</th>
                            <th>JSA Acknowledgment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkedInUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{new Date(user.timestamp).toLocaleString()}</td>
                                <td>{user.wellName}</td>
                                <td>
                                    {user.acknowledgedJsa ? (
                                        <span style={{ color: "green" }}>Acknowledged</span>
                                    ) : (
                                        <span style={{ color: "red" }}>Not Acknowledged</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={buttonClick}>Home</button>
        </div>
    );
}

export default CheckInPage;
