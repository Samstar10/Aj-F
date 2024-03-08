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

    const navigateToSignIn = () => {
        navigate("/signin")
    }

    return (
        <div className="p-5 w-screen h-screen flex justify-between">
            <div className="background-img hidden h-full w-1/2 rounded-[29px] xl:flex justify-start items-end p-10">
                <div >
                    <h1 className="text-3xl font-bold text-[37px] text-left text-[#FFFFFF]">Ajali</h1>
                    <p className="text-[#FFFFFF] text-[25px] mt-4 font-normal">Swift Alerts, Timely Actions</p>
                </div>
            </div>
            <div className="w-full xl:w-1/2 h-full px-5 md:px-40 lg:px-40 xl:px-20">
                <div className="text-right mb-9">
                    <h4 className="font-semibold text-xl">Ajali</h4>
                </div>
                <div className="flex flex-col justify-center mt-auto">
                    <div>
                        <p className="text-base font-normal">Welcome to Ajali</p>
                    </div>
                    <div className="mt-6 mb-9  mx-auto">
                        <div className="flex justify-center items-center p-3 bg-[#E2E3E3] rounded-[33px] shadow-lg">
                            <div className="bg-inherit px-4 xl:px-8 py-1 rounded-[33px]">
                                <button onClick={navigateToSignIn} className="text-[#0A2FB6] hover:text-white font-normal xl:text-base text-xs">Login</button>
                            </div>
                            <div className="bg-[#0A2FB6] px-4 xl:px-8 py-1 rounded-[33px]">
                                <button className="text-white font-normal text-xs xl:text-base">Register</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <label htmlFor="username" className="text-sm xl:text-base font-normal text-left mb-3">Username</label>
                            <input
                                type="text"
                                placeholder="user"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="border-[#AFAFAF] border-[1px] rounded-[40px] py-2 px-5 text-sm focus:outline-none mb-4"
                            />
                            <label htmlFor="email" className="text-sm xl:text-base font-normal text-left mb-3">Email</label>
                            <input
                                type="email"
                                placeholder="user@gmail.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border-[#AFAFAF] border-[1px] rounded-[40px] py-2 px-5 text-sm focus:outline-none mb-4"
                            />
                            <label htmlFor="password" className="text-sm xl:text-base font-normal text-left mb-3">Password</label>
                            <input
                                type="password"
                                placeholder="*******"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border-[#AFAFAF] border-[1px] rounded-[40px] py-2 px-5 text-sm focus:outline-none mb-4"
                            />
                            <label htmlFor="confirmPassword" className="text-sm xl:text-base font-normal text-left mb-3">Confirm Password</label>
                            <input 
                                type="password"
                                placeholder="*******"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="border-[#AFAFAF] border-[1px] rounded-[40px] py-2 px-5 text-sm focus:outline-none mb-16"
                            />
                            <button type="submit" className="text-right bg-[#0A2FB6] ml-auto text-white text-sm xl:text-base flex justify-center items-center py-3 w-1/2 rounded-[36px] hover:bg-[#5573de] shadow-xl">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}