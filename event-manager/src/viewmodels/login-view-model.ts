// src/viewmodels/Auth/useLoginViewModel.ts
"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/Admin/auth-action";

export const useLoginViewModel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await dispatch<any>(login(email, password));
      console.log("loginvm");
      if (res && res.accessToken) {
        if (email === "admin@event.com") {
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
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSubmit,
  };
};
