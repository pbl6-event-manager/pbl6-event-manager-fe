import type React from "react"
import EventbriteLogo from "../eventbrite-logo"
import { useLoginViewModel } from "../../viewmodels/login-view-model"
import { useSignUpViewModel } from "../../viewmodels/signup-view-model"

const PasswordStep: React.FC = () => {
  const { localEmail, password, setPassword, loading, error, handleSubmit } = useLoginViewModel();
  const { handleLoginBack } = useSignUpViewModel();

  
  return (
    <div className="bg-white rounded-lg p-10 w-[400px] max-w-[90vw] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <div className="text-center mb-[30px] w-[120px] h-[24px] mx-auto">
        <EventbriteLogo />
      </div>

      <div className="text-center">
        <button
          onClick={handleLoginBack}
          className="flex items-center text-[#6f7287] hover:text-[#1e0a3c] mb-4 text-sm font-medium transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-[32px] font-bold text-[#1e0a3c] mb-2 leading-[1.2] text-left">Welcome back!</h1>
        <h2 className="text-[20px] font-normal text-[#6f7287] mb-[30px] leading-[1.2] text-left">
          Enter your password for {localEmail}
        </h2>

        <form onSubmit={handleSubmit} className="mb-[30px]">
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
            disabled={loading || !password.trim()}
            className="w-full bg-[#f05537] text-white py-[14px] px-5 rounded text-base font-semibold cursor-pointer 
              transition-colors duration-200 hover:bg-[#e04527] disabled:opacity-60 disabled:cursor-not-allowed mt-6"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

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
