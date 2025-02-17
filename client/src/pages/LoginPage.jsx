import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import axios from "axios";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://onsite-pro-backend.onrender.com/login", {
                username,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                navigate("/dashboard", { state: { role: response.data.role } });
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className="loginPage-container">
            <div className="login-form">
                <h1>Login to On-Site Pro</h1>

                {/* Demo Account Box */}
                <div className="demo-account-box">
                    <h3>Demo Account</h3>
                    <p><strong>Username:</strong> demoUser</p>
                    <p><strong>Password:</strong> DemoPass123</p>
                    <p className="server-delay-note">
                        Note: This app runs on a free server. Please allow up to 55 seconds for the backend to wake up.
                    </p>
                </div>

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
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Login</button>
                </form>
                <p>
                    No account? <a href="/signupPage">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;

