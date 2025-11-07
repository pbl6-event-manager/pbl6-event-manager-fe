import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/auth-action";
import type { RootState } from "../store/store";

export const useLoginViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state: RootState) => state.authFlowReducer);
  const [localEmail, setLocalEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): { isValid: boolean; error: string | null } => {
    if (!email.trim()) {
      return { isValid: false, error: "Please enter email" };
    }

    if (email.length > 50) {
      return { isValid: false, error: "Email exceeds the allowed length" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: "Invalid email format" };
    }


    return { isValid: true, error: null };
  };

  const validatePassword = (password: string): { isValid: boolean; error: string | null } => {
    if (!password.trim()) {
      return { isValid: false, error: "Please enter password" };
    }

    if (password.length < 8) {
      return { isValid: false, error: "Password must be at least 8 characters" };
    }

    if (/^\d+$/.test(password)) {
      return { isValid: false, error: "Password is weak, please change to a stronger password" };
    }

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    if (!hasSpecialChar && !hasLetter) {
      return { isValid: false, error: "Password is weak, please change to a stronger password" };
    }

    return { isValid: true, error: null };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate email
    const emailValidation = validateEmail(localEmail);
    if (!emailValidation.isValid) {
      setError(emailValidation.error);
      setLoading(false);
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.error);
      setLoading(false);
      return;
    }

    try {
      const res = await dispatch<any>(login(localEmail, password));
      if (res && res.accessToken) {
        if (localEmail === "admin@event.com") {
          navigate("/admin/users");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Incorrect password");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error?.response?.status === 404 || error?.message?.includes("not found")) {
        setError("Account does not exist");
      } else {
        setError("Incorrect password");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    localEmail,
    setLocalEmail,
    password,
    setPassword,
    loading,
    handleSubmit,
    error,
    setError,
    setLoading,
    validateEmail,
    validatePassword
  };
};