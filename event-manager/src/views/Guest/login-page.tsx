import type React from "react";
import LoginForm from "../../components/Guest/login-form";

const LoginPage: React.FC = () => {
    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-10">
                <img src="/public/images/yoga-background.jpg" alt="Yoga class background" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-20 flex justify-center items-center w-full h-full">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;