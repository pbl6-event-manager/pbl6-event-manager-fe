import { useState } from "react";
import { useDispatch } from "react-redux";

import { checkEmailExists, setEmail } from "../store/actions/common/auth-flow-action";

export const useSignUpViewModel = () => {
  const dispatch = useDispatch();

  const [localEmail, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleContinue = async (e: React.FormEvent) => {
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

  return {
    localEmail,
    setLocalEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleContinue,
    error,
    setError,
    isLoading
  };
};