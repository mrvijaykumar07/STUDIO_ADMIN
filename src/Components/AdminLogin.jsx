import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { FcGoogle } from "react-icons/fc";
import api from "../utils/axios"

const AdminLogin = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "super_admin",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/v1/auth/register", form);
      const data = res.data;

      if (data.success) {
        alert("Registration successful! Please login.");
        setIsRegister(false);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
    setLoading(false);
  };

  // 🔹 Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/v1/auth/login", {
        email: form.email,
        password: form.password,
      });

      const data = res.data;
      console.log("Login API Response:", data);

      if (data.success) {
        dispatch(
          loginSuccess({
            user: data.data.user,
            accessToken: data.data.tokens.accessToken,
            refreshToken: data.data.tokens.refreshToken,
          })
        );

        localStorage.setItem("accessToken", data.data.tokens.accessToken);
        localStorage.setItem("refreshToken", data.data.tokens.refreshToken);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.data.user));
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    try {
      const res = await api.get("/v1/auth/google");
      const data = res.data;
      if (data.success) {
        window.location.href = data.data.authUrl;
      }
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Form Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-6 order-1 md:order-none">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            {isRegister ? "Register" : "Admin Login"}
          </h2>

          <form
            onSubmit={isRegister ? handleRegister : handleLogin}
            className="space-y-4"
          >
            {isRegister && (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="photographer">Photographer</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </select>
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
            >
              {loading ? "Processing..." : isRegister ? "Register" : "Login"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500 text-center">
            {isRegister ? "Already have an account?" : "New user?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-purple-600 hover:underline"
            >
              {isRegister ? "Login here" : "Register here"}
            </button>
          </p>

          {!isRegister && (
            <>
              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-3 text-gray-500 text-sm">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition"
              >
                <FcGoogle className="text-2xl mr-2" />
                Sign in with Google
              </button>
            </>
          )}
        </div>
      </div>

      {/* Text Section */}
      <div className="flex w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 text-white items-center justify-center p-12 order-2 md:order-none">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Welcome to Studio Admin</h1>
          <p className="text-lg text-gray-200">
            Manage your studio projects, bookings, and clients all in one place
            with a secure and easy-to-use dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
