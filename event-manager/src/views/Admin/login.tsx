import React, { useState } from "react";
import { loginService } from "../../service/Admin/auth-service";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("admin@event.com");
  const [password, setPassword] = useState("admin123");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await loginService("admin@event.com", "admin123")
      console.log("Response:", res.data); // Thêm dòng này
      const token = res.data.accessToken; // Sửa lại nếu tên khác
      console.log(token);
      setAccessToken(token);
      localStorage.setItem("accessToken", token);
    } catch (err: any) {
      setError("Đăng nhập thất bại!");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "50px auto", fontFamily: "sans-serif" }}>
      <h2>Login</h2>
      {!accessToken ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          />
          <button type="submit" style={{ width: "100%", padding: "5px" }}>
            Login
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      ) : (
        <div>
          <p style={{ color: "green" }}>Đăng nhập thành công!</p>
          <p><strong>Access Token:</strong> {accessToken}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;