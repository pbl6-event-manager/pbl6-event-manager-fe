import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/auth-action";
import type { RootState } from "../store/store";

export const useLoginViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state: RootState) => state.authFlow);
  const [localEmail, setLocalEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!password.trim() || !localEmail.trim()) return;
    try {
      const res = await dispatch<any>(login(localEmail, password));
      if (res && res.accessToken) {
        if (localEmail === "admin@event.com") {
          navigate("/admin/users");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Wrong password or email");
      }

    } catch (error) {
      console.error("Login error:", error);
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
    setLoading
  };
};
