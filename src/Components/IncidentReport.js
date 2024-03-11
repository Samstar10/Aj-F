import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MapWithSearch from "./MapWithSearch";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function IncidentReport() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        latitude: "",
        longitude: ""
    })
    const [files, setFiles] = useState([])
    const [username, setUsername] = useState("")
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const googleMapsApiKey = "AIzaSyAzkck1QZS55S3XuMZ4jXNzkfH-W2r6u_8"

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setFormData({
                ...formData,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
    }, [])

    useEffect(() => {
        if(token){
            const pay_load = jwtDecode(token)
            const payload = JSON.parse(atob(token.split(".")[1]))
            const name = payload.username

            setUsername(name)
        }
    }, [])

    const createIncidentReport = (e) => {

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
        <div className="flex">
            <Sidebar />
            <div className="flex-1 md:ml-[20%]">
                <Header name={username} />
                <div className="h-screen w-full flex items-center flex-col p-20">
                    <h1>Report an incident</h1>
                    <div className="border-1 border-black w-full">
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
                        <MapWithSearch googleMapsApiKey={googleMapsApiKey} />
                    </div>

                </div> 
            </div>
        </div>
    );
}