import type React from "react"

const SocialLoginButtons: React.FC = () => {
    const handleAppleLogin = () => {
        console.log("Apple login clicked")
    }

    const handleGoogleLogin = () => {
        console.log("Google login clicked")
    }

    const handleFacebookLogin = () => {
        console.log("Facebook login clicked")
    }

    return (
        <div className="flex justify-center gap-4 mb-8">
            <button
                className="w-12 h-12 flex items-center justify-center border-2 border-[#d9dbe9] rounded bg-white cursor-pointer transition-all duration-200 hover:border-[#c4c7d0] hover:-translate-y-0.5 text-black"
                onClick={handleAppleLogin}
                type="button"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18.71 19.5  C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
            </button>

            <button 
            className="w-12 h-12 flex items-center justify-center border-2 border-[#d9dbe9] rounded bg-white cursor-pointer transition-all duration-200 hover:border-[#c4c7d0] hover:-translate-y-0.5 text-black" 
            onClick={handleGoogleLogin} 
            type="button"
            >
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path
                        fill="#4285F4"
                        d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"
                    />
                    <path
                        fill="#34A853"
                        d="M10 20c2.7 0 4.96-.89 6.62-2.41l-3.16-2.45c-.88.59-2.01.94-3.46.94-2.66 0-4.92-1.8-5.73-4.22H1.07v2.52C2.72 17.75 6.09 20 10 20z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M4.27 11.86c-.21-.59-.33-1.23-.33-1.86s.12-1.27.33-1.86V5.62H1.07C.39 6.97 0 8.43 0 10s.39 3.03 1.07 4.38l3.2-2.52z"
                    />
                    <path
                        fill="#EA4335"
                        d="M10 3.95c1.5 0 2.85.52 3.93 1.54l2.94-2.94C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.62l3.2 2.52C5.08 5.75 7.34 3.95 10 3.95z"
                    />
                </svg>
            </button>

            <button 
            className="w-12 h-12 flex items-center justify-center border-2 border-[#d9dbe9] rounded bg-white cursor-pointer transition-all duration-200 hover:border-[#c4c7d0] hover:-translate-y-0.5 text-[#1877f2]" 
            onClick={handleFacebookLogin} 
            type="button"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#1877F2">
                    <path d="M20 10c0-5.52-4.48-10-10-10S0 4.48 0 10c0 4.99 3.66 9.13 8.44 9.88v-6.99H5.9V10h2.54V7.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V10h2.78l-.44 2.89h-2.34v6.99C16.34 19.13 20 14.99 20 10z" />
                </svg>
            </button>
        </div>
    )
}

export default SocialLoginButtons
