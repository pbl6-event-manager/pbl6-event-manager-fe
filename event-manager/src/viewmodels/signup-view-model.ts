import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkEmailExists, goBack, resetAuthFlow, setEmail, setUserInfo } from "../store/actions/auth-flow-action";
import type { RootState } from "../store/store";
import type { SignUpDto } from "../dtos/auth-dto";
import { signup } from "../store/actions/auth-action";
import { useNavigate } from "react-router-dom";

export const useSignUpViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {email, userInfo} = useSelector((state: RootState) => state.authFlowReducer);
  const [isSuccess, setIsSuccess] = useState(false);
  const [localEmail, setLocalEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  
  const handleEmailContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!localEmail.trim()) return
    setLoading(true);
    dispatch(setEmail(localEmail));
    try {
        const res = await dispatch<any>(checkEmailExists(localEmail));
        setTimeout(() => {
            setLoading(false);
        })
        return res.data;
    } catch (error) {
        console.log(error);
    } 
  }

  const handleLoginBack = () => {
    dispatch(goBack());
    dispatch(resetAuthFlow());
  }

  const handleUserInfoContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim()) return

    dispatch(setUserInfo({ firstName: firstName.trim(), lastName: lastName.trim() }))
  }

  const handleSignUpBack = () => {
    dispatch(goBack())
  }

  const handleEditEmail = () => {
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

    setLoading(true);

    try {
      const user : SignUpDto = {
        email: email,
        password: password,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      }
      const res = await dispatch<any>(signup(user));
      if(res.statusCode === 201) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log("Sign up failed: ", error);
    }
  }

  const handleGoToLogin = () => {
    navigate("/login");
    dispatch(resetAuthFlow());
  }

  return {
    localEmail,
    setLocalEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleEmailContinue,
    error,
    setError,
    isLoading,
    handleLoginBack,
    handleEditEmail,
    handleUserInfoContinue,
    handleSignUpBack,
    confirmPassword,
    setConfirmPassword,
    handleCreateAccount,
    isSuccess,
    handleGoToLogin
  };
};