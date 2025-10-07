"use client"

import type React from "react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { goBack, setLoading } from "../../store/actions/common/auth-flow-action"
import { loginSuccess } from "../../store/actions/common/auth-action"
import { setCurrentPage } from "../../store/actions/common/navigation-action"
// import { MOCK_USERS } from "../../store/reducers/common/auth-flow-reducer"
import EventbriteLogo from "../even-brite-logo"
import { useSignUpViewModel } from "../../viewmodels/signup-view-model"

const PasswordStep: React.FC = () => {
  const dispatch = useAppDispatch()
  const { email, isLoading } = useAppSelector((state) => state.authFlow)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    // e.preventDefault()
    // if (!password.trim()) return

    // dispatch(setLoading(true))

    // setTimeout(() => {
    //   const mockUser = ;

    //   if (mockUser && mockUser.password === password) {
    //     const user = {
    //       email: mockUser.email,
    //       firstName: mockUser.firstName,
    //       lastName: mockUser.lastName,
    //       name: `${mockUser.firstName} ${mockUser.lastName}`,
    //     }
    //     dispatch(loginSuccess({ email, user }))
    //     dispatch(setCurrentPage("overview"))
    //   } else {
    //     setError("Incorrect password. Please try again.")
    //   }

    //   dispatch(setCurrentPage("overview"))
    //   dispatch(setLoading(false))
    // }, 1000)
  }

  const handleBack = () => {
    dispatch(goBack())
  }
  return (
    <div className="bg-white rounded-lg p-10 w-[400px] max-w-[90vw] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <div className="text-center mb-[30px] w-[120px] h-[24px] mx-auto">
        <EventbriteLogo />
      </div>

      <div className="text-center">
        <button
          onClick={handleBack}
          className="flex items-center text-[#6f7287] hover:text-[#1e0a3c] mb-4 text-sm font-medium transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-[32px] font-bold text-[#1e0a3c] mb-2 leading-[1.2] text-left">Welcome back!</h1>
        <h2 className="text-[20px] font-normal text-[#6f7287] mb-[30px] leading-[1.2] text-left">
          Enter your password for {email}
        </h2>

        <form onSubmit={handleLogin} className="mb-[30px]">
          <div className="mb-5 text-left">
            <label htmlFor="password" className="block text-sm text-[#6f7287] mb-2 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-[#d9dbe9] rounded text-base text-[#1e0a3c] bg-white 
                transition-colors duration-200 focus:outline-none focus:border-[#f05537] box-border"
              required
            />
          </div>

          {error && <div className="mb-4 text-red-600 text-sm text-left">{error}</div>}

          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="w-full bg-[#f05537] text-white py-[14px] px-5 rounded text-base font-semibold cursor-pointer 
              transition-colors duration-200 hover:bg-[#e04527] disabled:opacity-60 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* <div className="text-center mb-4">
          <button
            onClick={handleBackToEmail}
            className="text-[#3659e3] no-underline text-sm font-medium hover:underline bg-none border-none cursor-pointer"
          >
            Use a different email
          </button>
        </div> */}

        <div className="text-center">
          <a href="#" className="text-[#3659e3] no-underline text-sm font-medium hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  )
}

export default PasswordStep
