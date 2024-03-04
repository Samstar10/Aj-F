import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PasswordReset() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
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

        if (formData.password !== formData.confirmPassword) {
            alert("passwords do not match")
            return
        }

        try{
            fetch("https://ajali-b.onrender.com/signup", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data) {
                    console.log("password reset", data)
                    navigate("/signin")
                }
                else {
                    console.log("password reset failed", data)
                }
            })
        }catch(err) {
            console.log(err)
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    name="email"
                    placeholder="Please enter your email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter Password"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    )
}