import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });
  const [lectureData, setLectureData] = useState({
    course_id: "",
    instructor_id: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // To navigate programmatically

  useEffect(() => {
    const fetchCoursesAndInstructors = async () => {
      try {
        const coursesRes = await axios.get(`${apiUrl}/courses`);
        const instructorsRes = await axios.get(`${apiUrl}/instructors`);
        setCourses(coursesRes.data);
        setInstructors(instructorsRes.data);
      } catch (err) {
        setError("Failed to fetch courses or instructors");
        console.error(err);
      }
    };
    fetchCoursesAndInstructors();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/courses`, newCourse);
      setCourses([...courses, response.data]);
      setMessage("Course added successfully!");
      setNewCourse({ name: "", level: "", description: "", image: "" });
    } catch (err) {
      setError("Failed to add course.");
      console.error(err);
    }
  };

  const handleAssignLecture = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/lectures`, lectureData);
      setLectures([...lectures, response.data]);
      setMessage("Lecture assigned successfully!");
      setLectureData({ course_id: "", instructor_id: "", date: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to assign lecture.");
      console.error(err);
    }
  };

  // Logout handler with confirmation modal
  const handleLogout = () => {
    setShowModal(true); // Show the modal on logout
  };

  const confirmLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate("/"); // Navigate to the homepage
    setShowModal(false); // Close the modal
  };

  const cancelLogout = () => {
    setShowModal(false); // Just close the modal without logging out
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-blue-600 text-center py-4">
            Admin Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="text-red-600 text-center py-2 px-4 rounded-lg bg-red-50 mb-8 text-lg font-medium">
            {error}
          </div>
        )}
        {message && (
          <div className="text-green-600 text-center py-2 px-4 rounded-lg bg-green-50 mb-8 text-lg font-medium">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-6">
          {/* View Courses Section */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              All Courses
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-600">
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Course Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-gray-50 transition duration-300"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {course.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {course.level}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {course.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {course.image}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Course Form */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Add New Course
            </h3>
            <form onSubmit={handleAddCourse} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
                className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="level"
                placeholder="Level"
                value={newCourse.level}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, level: e.target.value })
                }
                className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="description"
                placeholder="Course Description"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="Course Image URL"
                value={newCourse.image}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, image: e.target.value })
                }
                className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200 text-lg"
              >
                Add Course
              </button>
            </form>
          </div>
        </div>

        {/* Assign Lecture Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Assign Lecture to Instructor
          </h3>
          <form onSubmit={handleAssignLecture} className="space-y-6">
            <select
              name="course_id"
              value={lectureData.course_id}
              onChange={(e) =>
                setLectureData({ ...lectureData, course_id: e.target.value })
              }
              className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <select
              name="instructor_id"
              value={lectureData.instructor_id}
              onChange={(e) =>
                setLectureData({
                  ...lectureData,
                  instructor_id: e.target.value,
                })
              }
              className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={lectureData.date}
              onChange={(e) =>
                setLectureData({ ...lectureData, date: e.target.value })
              }
              className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200 text-lg"
            >
              Assign Lecture
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelLogout}
                className="bg-gray-300 px-6 py-2 rounded-lg text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
