"use client"

import type React from "react"
import { useState } from "react"
import EventbriteLogo from "../even-brite-logo"

const SignUpForm: React.FC = () => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Handle sign up logic here
        setTimeout(() => setIsLoading(false), 1000)
    }


    return (
        <div className="bg-white rounded-lg p-10 w-[400px] max-w-[90vw] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
            <div className="text-center mb-[30px] w-[120px] h-[24px] mx-auto">
                <EventbriteLogo />
            </div>

            <div className="space-y-6">
                <div>
                    <h1 className="text-[32px] font-bold text-[#1e0a3c] mb-2 leading-[1.2] text-left">Let's set up your account</h1>
                </div>

                <form onSubmit={handleContinue} className="space-y-4">
                    {/* Email field with edit button */}
                    <div className="space-y-1">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* First name field */}
                    <div className="space-y-1">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Last name field */}
                    <div className="space-y-1">
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Terms text */}
                    <div className="mt-5">
                        <p className="text-xs text-[#6f7287] leading-relaxed m-0">
                            By clicking Continue, you agree to Eventbrite's{" "}
                            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                                Privacy Policy
                            </a>
                        </p>
                    </div>

                    {/* Continue button */}
                    <button
                        type="submit"
                        disabled={isLoading || !firstName.trim() || !lastName.trim()}
                        className="w-full bg-[#f05537] text-white py-[14px] px-5 rounded text-base font-semibold cursor-pointer 
         transition-colors duration-200 hover:bg-[#e04527] disabled:opacity-60 disabled:cursor-not-allowed mt-6"
                    >
                        {isLoading ? "Loading..." : "Continue"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm

