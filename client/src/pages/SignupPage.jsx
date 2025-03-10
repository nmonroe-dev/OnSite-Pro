import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupPage.css";
import axios from "axios";

function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("contractor"); 
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://onsite-pro-backend.onrender.com/register", {
                username,
                password,
                role,
            });

            if (response.status === 201) {
                navigate("/loginPage");
            }
        } catch (error) {
            console.error("Signup error:", error);
            setError("Failed to sign up. Please try again.");
        }
    };

    return (
        <div className="signupPage-container">
            <div className="signup-form">
                <h1>Create Your On-Site Pro Account</h1>
                <form onSubmit={handleSubmit}>
                    
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="contractor">Contractor</option>
                        <option value="vendor">Vendor</option>
                        <option value="admin">Admin (Full Access)</option>
                    </select>

                    {/* Admin Warning */}
                    {role === "admin" && (
                        <p className="admin-warning">
                             Admin role grants full access to the system.
                        </p>
                    )}

                    {/* Server Wakeup Notice */}
                    <p className="server-delay-note">
                        Note: After signing up, please allow up to 55 seconds for the backend to wake up before logging in.
                    </p>

                    
                    {error && <p className="error-message">{error}</p>}

                    
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;

