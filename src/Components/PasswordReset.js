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
        <div className="p-5 w-screen h-screen flex justify-between">
            <div className="background-img hidden h-full w-1/2 rounded-[29px] xl:flex justify-start items-end p-10">
                <div >
                    <h1 className="text-3xl font-bold text-[37px] text-left text-[#FFFFFF]">Ajali</h1>
                    <p className="text-[#FFFFFF] text-[25px] mt-4 font-normal">Swift Alerts, Timely Actions</p>
                </div>
            </div>
            <div className="w-full xl:w-1/2 h-full px-5 md:px-40 lg:px-40 xl:px-20">
                <div className="text-right mb-24">
                    <h4 className="font-semibold text-xl">Ajali</h4>
                </div>
                <div className="flex flex-col justify-center mt-auto">
                    <div className="mb-10">
                        <p className="text-xl font-semibold">Reset Your Password</p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <label className="text-sm xl:text-base font-normal text-left mb-3">Email</label>
                            <input 
                                type="email"
                                name="email"
                                placeholder="Please enter your email"
                                onChange={handleChange}
                                value={formData.email}
                                className="border-[#AFAFAF] border-[1px] rounded-[40px] py-2 px-5 text-sm focus:outline-none mb-6"
                            />
                            <label className="text-sm xl:text-base font-normal text-left mb-3">Password</label>
                            <input 
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                value={formData.password}
                                className="border-[#AFAFAF] border-[1px] rounded-[40px] py-2 px-5 text-sm focus:outline-none mb-6"
                            />
                            <label className="text-sm xl:text-base font-normal text-left mb-3">Confirm Password</label>
                            <input 
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter Password"
                                onChange={handleChange}
                                value={formData.confirmPassword}
                                className="border-[#AFAFAF] border-[1px] rounded-[40px] py-2 px-5 text-sm focus:outline-none mb-16"
                            />
                            <button type="submit" className="text-right bg-[#0A2FB6] ml-auto text-white text-sm xl:text-base flex justify-center items-center py-3 w-1/2 rounded-[36px] hover:bg-[#5573de] shadow-xl">Reset</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}