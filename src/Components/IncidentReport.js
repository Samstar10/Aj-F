import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MapWithSearch from "./MapWithSearch";
import { useNavigate } from "react-router-dom";

export default function IncidentReport() {
    const [formData, setFormData] = useState(() => {
        const storedFormData = localStorage.getItem("formData")
        return storedFormData ? JSON.parse(storedFormData) : {
            title: "",
            description: "",
            location: "",
            latitude: 0,
            longitude: 0,
        }
    })
    const [files, setFiles] = useState([])
    const [username, setUsername] = useState("")
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const googleMapsApiKey = "AIzaSyAzkck1QZS55S3XuMZ4jXNzkfH-W2r6u_8"

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        if(token){
            const payload = JSON.parse(atob(token.split(".")[1]))
            const name = payload.username

            setUsername(name)
        }
    }, [])

    const handleLocationSelect = ({latitude, longitude, location}) => {
        setFormData({
            ...formData,
            latitude: latitude,
            longitude: longitude,
            location: location
        })

        console.log(latitude, longitude, location, formData)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((formData) => ({...formData, [name]: value}))
    }

    

    const createIncidentReport =async (currentFormData) => {

        try{
            fetch("https://ajali-b.onrender.com/incidents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(currentFormData)
            })
            .then((res) => res.json())
            .then((data) => {
                if(data) {
                    console.log("incident reported", data)
                    return data
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
                    "Authorization": `Bearer ${token}`
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const currentFormData = JSON.parse(localStorage.getItem("formData"))

        try{
            createIncidentReport(currentFormData)
            uploadMedia(currentFormData.id)
            navigate("/myincidents")
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
                            <label htmlFor="file">Images</label>
                            <input type="file" name="file" multiple onChange={(e) => setFiles(e.target.files)}/>
                            <MapWithSearch googleMapsApiKey={googleMapsApiKey} onLocationSelect={handleLocationSelect} />
                            <button type="submit">Submit</button>
                        </form>
                    </div>

                </div> 
            </div>
        </div>
    );
}