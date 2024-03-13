import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MapWithSearch from "./MapWithSearch";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function IncidentReport() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        latitude: 0,
        longitude: 0
    })
    const [files, setFiles] = useState([])
    const [username, setUsername] = useState("")
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const googleMapsApiKey = "AIzaSyAzkck1QZS55S3XuMZ4jXNzkfH-W2r6u_8"


    useEffect(() => {
        if(token){
            const payload = JSON.parse(atob(token.split(".")[1]))
            const name = payload.username

            setUsername(name)
        }
    }, [token])

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
        setFormData((formData) => {
            const updatedFormData = {...formData, [name]: value}
            localStorage.setItem("formData", JSON.stringify(updatedFormData))
            return updatedFormData
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)

        const storedData = localStorage.getItem("formData")
        const data = storedData ? JSON.parse(storedData) : {
            title: "",
            description: "",
            location: "",
            latitude: 0,
            longitude: 0
        }

        try{
            const response = await axios.post("https://ajali-b.onrender.com/incidents", data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response.data)
            navigate("/myincidents")
            localStorage.removeItem("formData")
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