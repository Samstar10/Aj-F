import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const [formData, setFormData] = useState({
        username: "",
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

        if(formData.password !== formData.confirmPassword) {
            alert("passwords do not match")
            return
        }

        try{
            fetch("https://ajali-b.onrender.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.access_token) {
                    localStorage.setItem("token", data.access_token)
                    console.log("signed up", data)
                    navigate("/signin")
                }
                else {
                    console.log("sign up failed", data)
                }
            })
        }
        catch(err) {
            console.log(err)
        }
        // setFormData({
        //     username: "",
        //     email: "",
        //     password: "",
        //     confirmPassword: ""
        // })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                placeholder="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            <button type="submit">Sign Up</button>
        </form>
    )
}