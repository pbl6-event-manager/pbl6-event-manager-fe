import type React from "react"
import EventbriteLogo from "../even-brite-logo"
import { useSignUpViewModel } from "../../viewmodels/signup-view-model"

const UserInfoStep: React.FC = () => {
  const {firstName, setFirstName, lastName, setLastName, localEmail, handleSignUpBack, handleUserInfoContinue, handleEditEmail} = useSignUpViewModel();
  return (
    <div className="bg-white rounded-lg p-10 w-[400px] max-w-[90vw] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <div className="text-center mb-[30px] w-[120px] h-[24px] mx-auto">
        <EventbriteLogo />
      </div>

      <button
        onClick={handleSignUpBack}
        className="flex items-center text-[#6f7287] hover:text-[#1e0a3c] mb-4 text-sm font-medium transition-colors duration-200"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="space-y-6">
        <div>
          <h1 className="text-[32px] font-bold text-[#1e0a3c] mb-2 leading-[1.2] text-left">
            Let's set up your account
          </h1>
        </div>

        <form onSubmit={handleUserInfoContinue} className="space-y-4">
          {/* Email field with edit button */}
          <div className="space-y-1">
            <div className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
              <input
                type="email"
                value={localEmail}
                className="flex-1 bg-transparent border-none outline-none text-gray-700"
                readOnly
              />
              <button
                type="button"
                onClick={handleEditEmail}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm ml-2"
              >
                Edit
              </button>
            </div>
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
            disabled={!firstName.trim() || !lastName.trim()}
            className="w-full bg-[#f05537] text-white py-[14px] px-5 rounded text-base font-semibold cursor-pointer 
              transition-colors duration-200 hover:bg-[#e04527] disabled:opacity-60 disabled:cursor-not-allowed mt-6"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserInfoStep
