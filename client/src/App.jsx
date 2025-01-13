import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import IncidentReportForm from "./pages/IncidentReportForm";
import NearestHospitalPage from "./pages/NearestHospitalPage";
import AddWellPage from "./pages/AddWellPage";
import WellLocationPage from "./pages/WellLocationPage";
import EmergencyContactsPage from "./pages/EmergencyContactsPage";
import JsaPage from "./pages/JsaPage";
import OtherFeaturePage from "./pages/OtherFeaturePage";
import UploadJsa from "./pages/UploadJsa";
import CheckInPage from "./pages/CheckInPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/signupPage" element={<SignupPage />} />
                <Route path="/loginPage" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/incidentReportFormPage" element={<IncidentReportForm />} />
                <Route path="/hospitalPage" element={<NearestHospitalPage />} />
                <Route path="/addWellPage" element={<AddWellPage />} />
                <Route path="/wellLocationPage" element={<WellLocationPage />} />
                <Route path="/emergencyPage" element={<EmergencyContactsPage />} />
                <Route path="/viewjsa" element={<JsaPage />} />
                <Route path="/otherFeaturePage" element={<OtherFeaturePage />} />
                <Route path="/jsaSigning" element={<UploadJsa />} />
                <Route path="/checkInUserPage" element={<CheckInPage />} />
            </Routes>
        </Router>
    );
}

export default App;
