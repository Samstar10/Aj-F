import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try{
            fetch("https://ajali-b.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.access_token) {
                    localStorage.setItem("token", data.access_token)
                    console.log("signed in", data)
                    navigate("/incidentreport")
                }
                else {
                    console.log("sign in failed", data)
                }
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Please enter your username"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}