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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch<any>(login(email, password));

      if (email === "admin@event.com") {
        navigate("/admin/users"); // ví dụ: admin page
      } else {
        navigate("/dashboard"); // ví dụ: user dashboard
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
