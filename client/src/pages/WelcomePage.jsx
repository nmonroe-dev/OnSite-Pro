import { Link } from "react-router-dom";
import "../styles/WelcomePage.css"; 

function WelcomePage() {
    return (
        <div className="welcomePage-container">
            
            <div className="welcome-logo">
                <img src="/assets/logo.png" alt="On-Site Pro Logo" />
            </div>

            
            <div className="welcome-title">
                <h1>Welcome to On-Site Pro</h1>
                <p>Streamline Your Well Site Operations with Ease and Security</p>
            </div>

            
            <div className="button-container">
                <Link to="/signupPage">
                    <button>Sign Up</button>
                </Link>
                <Link to="/loginPage">
                    <button>Login</button>
                </Link>
            </div>

            
            <p className="version-text">v1.0.0</p>
        </div>
    );
}

export default WelcomePage;
