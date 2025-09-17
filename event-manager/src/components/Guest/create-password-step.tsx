"use client"

import type React from "react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { setLoading, goBack } from "../../store/actions/common/auth-flow-action"
import { loginSuccess } from "../../store/actions/common/auth-action"
import { setCurrentPage } from "../../store/actions/common/navigation-action"
import EventbriteLogo from "../even-brite-logo"

const CreatePasswordStep: React.FC = () => {
  const dispatch = useAppDispatch()
  const { email, userInfo, isLoading } = useAppSelector((state) => state.authFlow)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleBack = () => {
    dispatch(goBack())
  }

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!password.trim() || !confirmPassword.trim()) return

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    dispatch(setLoading(true))

    setTimeout(() => {
      const user = {
        email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        name: `${userInfo.firstName} ${userInfo.lastName}`,
      }

      dispatch(loginSuccess({ email, user }))
      dispatch(setCurrentPage("overview"))
      dispatch(setLoading(false))
    }, 1000)
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
        <h1 className="text-[32px] font-bold text-[#1e0a3c] mb-2 leading-[1.2] text-left">Create your password</h1>
        <h2 className="text-[20px] font-normal text-[#6f7287] mb-[30px] leading-[1.2] text-left">
          Almost done, {userInfo.firstName}!
        </h2>

        <form onSubmit={handleCreateAccount} className="mb-[30px]">
          <div className="mb-5 text-left">
            <label htmlFor="password" className="block text-sm text-[#6f7287] mb-2 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-3 border-2 border-[#d9dbe9] rounded text-base text-[#1e0a3c] bg-white 
                transition-colors duration-200 focus:outline-none focus:border-[#f05537] box-border"
              required
            />
          </div>

          <div className="mb-5 text-left">
            <label htmlFor="confirmPassword" className="block text-sm text-[#6f7287] mb-2 font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border-2 border-[#d9dbe9] rounded text-base text-[#1e0a3c] bg-white 
                transition-colors duration-200 focus:outline-none focus:border-[#f05537] box-border"
              required
            />
          </div>

          {error && <div className="mb-4 text-red-600 text-sm text-left">{error}</div>}

          <button
            type="submit"
            disabled={isLoading || !password.trim() || !confirmPassword.trim()}
            className="w-full bg-[#f05537] text-white py-[14px] px-5 rounded text-base font-semibold cursor-pointer 
              transition-colors duration-200 hover:bg-[#e04527] disabled:opacity-60 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-5">
          <p className="text-xs text-[#6f7287] leading-relaxed m-0">
            By creating an account, you agree to Eventbrite's{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreatePasswordStep
