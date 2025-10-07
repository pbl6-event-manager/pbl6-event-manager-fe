import type React from "react"
import { useAppSelector } from "../../hooks/redux"
import EmailStep from "../../components/Guest/email-step"
import PasswordStep from "../../components/Guest/password-step"
import UserInfoStep from "../../components/Guest/user-info-step"
import CreatePasswordStep from "../../components/Guest/create-password-step"

const AuthFlow : React.FC = () => {
    const { currentStep } = useAppSelector((state) => state.authFlow)

    const renderStep = () => {
        switch (currentStep) {
            case "email":
                return <EmailStep />
            case "password":
                return <PasswordStep />
            case "user-info":
                return <UserInfoStep />
            case "create-password":
                return <CreatePasswordStep />
            default:
                return <EmailStep />
        }
    }

    return (
        <div>
            {renderStep()}
        </div>
    )
}

export default AuthFlow