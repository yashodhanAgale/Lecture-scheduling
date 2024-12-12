import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login request to API
      const response = await axios.post(
        `${apiUrl}/api/auth/login`, // API endpoint without role
        formData
      );

      // Log the response to verify the data
      console.log("Login successful! Response data:", response);

      // Store the token in local storage
      localStorage.setItem("token", response.data.token);

      // Store user data in local storage (email, role)
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Get the role directly from the response
      const role = response.data.user.role;

      // Log the role to check its value
      console.log("Role from response:", role);

      // Navigate to the respective dashboard based on the role
      if (role) {
        console.log(`Navigating to /${role}-dashboard`);
        navigate(`/${role}-dashboard`);
      } else {
        console.error("Role is not present in the response.");
      }
    } catch (err) {
      // Handle login errors
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
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
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Dont have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
