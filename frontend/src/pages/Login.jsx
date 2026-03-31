import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosInstance";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "", role: "employee" });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors.map((e) => e.msg));
      } else {
        setErrors([err.response?.data?.message || "Login failed"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-5 rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">
            Corporate Task Manager
          </h1>
          <p className="text-center text-gray-500 text-sm mb-8">
            Sign in to your account to continue
          </p>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
              {errors.map((err, i) => (
                <p key={i} className="flex items-center gap-2">
                  <span className="text-red-500">•</span> {err}
                </p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 cursor-pointer"
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="employee">Employee</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Corporate Task Management System © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
