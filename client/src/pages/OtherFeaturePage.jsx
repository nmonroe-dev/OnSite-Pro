import "../styles/OtherFeature.css";
import { useLocation, useNavigate } from "react-router-dom";

function OtherFeaturePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedWell = location.state?.selectedWell;

    
    const features = [
        { label: "Upload JSA", icon: "fas fa-file-upload" },
        { label: "View Checked-In Users", icon: "fas fa-users" },
    ];

    
    const featureHandlers = {
        "Upload JSA": () => navigate("/jsaSigning", { state: { selectedWell } }),
        "View Checked-In Users": () => navigate("/checkInUserPage", { state: { selectedWell } }),
    };

    
    const featureClick = (featureLabel) => {
        const handler = featureHandlers[featureLabel];
        if (handler) {
            handler();
        } else {
            console.error("No handler found for feature:", featureLabel);
        }
    };

    
    const handleBackToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="other-feature-page-container">
            <div className="logo-container">
                    <img src="/assets/logo.png" alt="On-Site Pro Logo" />
                </div>
            <button className="other-feature-back-button" onClick={handleBackToDashboard}>
                Back to Dashboard
            </button>
            <div className="other-feature-block">
                <div className="other-feature-buttons">
                    {features.map((feature, index) => (
                        <div key={index} className="other-feature-button">
                            <button onClick={() => featureClick(feature.label)}>
                                <i className={feature.icon}></i>
                            </button>
                            <p>{feature.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OtherFeaturePage;
