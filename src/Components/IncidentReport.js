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
    const [files, setFiles] = useState([])
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const createIncidentReport = (e) => {
        const formData = new FormData();
        formData.append("title", formData.title);
        formData.append("description", formData.description);
        formData.append("location", formData.location);
        formData.append("latitude", formData.latitude);
        formData.append("longitude", formData.longitude);

        try{
            fetch("https://ajali-b.onrender.com/incidents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: formData
            })
            .then(res => res.json())
            .then((data) => {
                if(data) {
                    console.log("incident reported", data)
                    navigate("/myincidents")
                }
                else {
                    console.log("incident report failed", data)
                }
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    const uploadMedia = (reportId) => {
        const data = new FormData();

        for(let i = 0; i < files.length; i++) {
            data.append("file", files[i])
        }

        try{
            fetch(`https://ajali-b.onrender.com/incidents/media/${reportId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data
            })
            .then(res => res.json())
            .then((data) => {
                if(data) {
                    console.log("media uploaded", data)
                }
                else {
                    console.log("media upload failed", data)
                }
            })
        }
        catch(err) {
            console.log(err)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try{
            createIncidentReport()
            uploadMedia()
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Sidebar />
            <div className="h-screen items-center mx-auto flex flex-col">
                <h1>Report an incident</h1>
                <div className="w-1/2">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" placeholder="title" onChange={handleChange}/>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" placeholder="description" onChange={handleChange}/>
                        <label htmlFor="location">Location</label>
                        <input type="text" name="location" placeholder="location" onChange={handleChange}/>
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" name="latitude" placeholder="latitude" onChange={handleChange}/>
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" name="longitude" placeholder="longitude" onChange={handleChange}/>
                        <label htmlFor="file">Images</label>
                        <input type="file" name="file" multiple onChange={(e) => setFiles(e.target.files)}/>
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>            
        </div>
    );
}