import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [upcomingLectures, setUpcomingLectures] = useState([]);
  const [message, setMessage] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await axios.get(`${apiUrl}/courses`);
        const lecturesRes = await axios.get(`${apiUrl}/lectures`);
        setCourses(coursesRes.data);
        setUpcomingLectures(lecturesRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setMessage("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true); // Show the logout confirmation modal
  };

  const confirmLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/"); // Navigate to the login page
  };

  const cancelLogout = () => {
    setShowLogoutModal(false); // Close the modal if cancelled
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white flex-shrink-0">
        <div className="p-6 text-2xl font-semibold">Instructor Dashboard</div>
        <nav className="mt-8 px-4 space-y-6">
          <a
            href="#"
            className="text-lg text-white hover:bg-blue-700 p-4 rounded-lg block"
          >
            Overview
          </a>
          <a
            href="#"
            className="text-lg text-white hover:bg-blue-700 p-4 rounded-lg block"
          >
            My Courses
          </a>
          <a
            href="#"
            className="text-lg text-white hover:bg-blue-700 p-4 rounded-lg block"
          >
            Upcoming Lectures
          </a>
          <a
            href="#"
            className="text-lg text-white hover:bg-blue-700 p-4 rounded-lg block"
          >
            Profile Settings
          </a>
          <button
            onClick={handleLogout}
            className="text-lg text-white hover:bg-blue-700 p-4 rounded-lg block mt-6"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Overview Cards */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Total Courses
            </h3>
            <p className="text-4xl font-bold text-blue-600">{courses.length}</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Upcoming Lectures
            </h3>
            <p className="text-4xl font-bold text-blue-600">
              {upcomingLectures.length}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Total Students
            </h3>
            <p className="text-4xl font-bold text-blue-600">120</p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="mt-8 p-4 text-center text-white bg-red-500 rounded-lg">
            {message}
          </div>
        )}

        {/* Upcoming Lectures Table */}
        <div className="bg-white shadow-lg rounded-lg mt-8 p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Upcoming Lectures
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-600">
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Instructor
                  </th>
                </tr>
              </thead>
              <tbody>
                {upcomingLectures.map((lecture) => (
                  <tr
                    key={lecture.id}
                    className="hover:bg-gray-50 transition duration-300"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {lecture.course_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(lecture.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {lecture.instructor_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={cancelLogout}
                className="px-6 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
