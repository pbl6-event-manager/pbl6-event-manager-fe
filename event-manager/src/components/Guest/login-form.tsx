import EventbriteLogo from "../eventbrite-logo";
import SocialLoginButtons from "./social-login-buttons";
import { useLoginViewModel } from "../../viewmodels/login-view-model";
import { Link } from "react-router-dom";
import type React from "react";

const LoginForm: React.FC = () => {
    const { localEmail, setLocalEmail, password, setPassword, loading, handleSubmit, error } = useLoginViewModel();

    return (
        <div className="bg-white rounded-lg p-10 w-[400px] max-w-[90vw] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
            <div className="text-center mb-[30px] w-[120px] h-[24px] mx-auto">
                <EventbriteLogo />
            </div>

            <div className="text-center">
                <h1 className="text-[32px] font-bold text-[#1e0a3c] mb-2 leading-[1.2] text-left">Welcome!</h1>
                <h2 className="text-[32px] font-bold text-[#1e0a3c] mb-[30px] leading-[1.2] text-left">What's your email?</h2>

                <form className="mb-[30px]" onSubmit={handleSubmit}>
                    {/* Error Message Display */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm text-left">
                            {error}
                        </div>
                    )}

                    <div className="mb-5 text-left">
                        <label htmlFor="email" className="block text-sm text-[#6f7287] mb-2 font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={localEmail}
                            onChange={(e) => setLocalEmail(e.target.value)}
                            placeholder="example@gmail.com"
                            className="w-full px-4 py-3 border-2 border-[#d9dbe9] rounded text-base text-[#1e0a3c] bg-white 
         transition-colors duration-200 focus:outline-none focus:border-[#f05537] box-border"
                            required
                        />
                    </div>

                    <div className="mb-5 text-left">
                        <label htmlFor="password" className="block text-sm text-[#6f7287] mb-2 font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-[#d9dbe9] rounded text-base text-[#1e0a3c] bg-white 
         transition-colors duration-200 focus:outline-none focus:border-[#f05537] box-border"
                            required
                        />
                    </div>

                    <button type="submit" 
                            className="w-full bg-[#f05537] text-white py-[14px] px-5 rounded text-base font-semibold cursor-pointer 
         transition-colors duration-200 hover:bg-[#e04527] disabled:opacity-60 disabled:cursor-not-allowed mt-6"
                            disabled={loading}
                    >
                        {loading ? "Loading..." : "Log In"}
                    </button>
                </form>
                <p className="text-sm text-[#6f7287] mt-2">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-[#3659e3] font-medium hover:underline"
                    >
                        Click here to sign up
                    </Link>
                </p>

                <div className="relative my-8 text-[#6f7287] text-sm before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:h-px before:bg-[#d9dbe9] before:z-0">
                    <span className="relative z-10 bg-white px-4">Or sign in with</span>
                </div>

                <SocialLoginButtons />

                <div className="my-[30px] text-center">
                    <a href="#" className="text-[#3659e3] no-underline text-sm font-medium hover:underline">
                        Need help finding your tickets?
                    </a>
                </div>
            </div>
        </div>
    )
};

export default LoginForm;