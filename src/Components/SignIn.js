import React, { useState } from "react";

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

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
                    email: formData.email,
                    password: formData.password
                })
            })
            .then(res => res.json())
            .then((data) => {
                if(data.access_token) {
                    localStorage.setItem("token", data.access_token)
                    console.log("signed in", data)
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
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Please enter your email"
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