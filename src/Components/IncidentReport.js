import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

export default function IncidentReport() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        latitude: "",
        longitude: ""
    })
    const navigate = useNavigate();

    return (
        <div>
            <Sidebar />
            <h1>Incident Report</h1>
        </div>
    );
}