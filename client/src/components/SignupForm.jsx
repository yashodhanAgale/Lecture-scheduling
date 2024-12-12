import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "instructor", // Default role
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/signup`, // Use the correct API URL
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate(`/${formData.role}-dashboard`); // Use navigate instead of history.push
    } catch (err) {
      setError("Signup failed. Please try again.", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          required
        />
        {/* Role selection dropdown */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        >
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
