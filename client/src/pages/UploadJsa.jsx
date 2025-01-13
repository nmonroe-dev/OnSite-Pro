import { useState } from "react";
import axios from "axios";
import "../styles/UploadJsa.css";
import { useLocation, useNavigate } from "react-router-dom";

function UploadJsa() {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const location = useLocation();
    const selectedWell = location.state?.selectedWell;
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile || !selectedFile.type.startsWith("image/")) {
            alert("Please select a valid image file (JPEG or PNG)");
            setFile(null);
        } else {
            setFile(selectedFile);
        }
    };
    

    const handleUpload = async (event) => {
        event.preventDefault();
    
        if (!file || !selectedWell) {
            setUploadStatus("Please select a well and a file to upload.");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("wellId", selectedWell);
        formData.append("userId", localStorage.getItem("userId")); 
    
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "https://onsite-pro-backend.onrender.com/user/uploadJsa",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setUploadStatus("JSA uploaded successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error uploading JSA:", error);
            setUploadStatus("Failed to upload JSA. Please try again.");
        }
    };
    

    const goBackToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="upload-jsa-container">
            <h1>Upload JSA</h1>
            <form onSubmit={handleUpload}>
                <div className="form-group">
                    <label htmlFor="file">Select JSA File:</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
            <button onClick={goBackToDashboard}>Back to Dashboard</button>
        </div>
    );
}

export default UploadJsa;
