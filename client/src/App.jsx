// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";
// import AdminDashboard from "./pages/AdminDashboard"; // Your protected admin dashboard
// import InstructorDashboard from "./pages/InstructorDashboard"; // Your protected instructor dashboard
// import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/signup" element={<SignupForm />} />

//         {/* Protect dashboard routes with roles */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute
//               element={<AdminDashboard />}
//               requiredRole="admin" // Only admin can access this route
//             />
//           }
//         />
//         <Route
//           path="/instructor-dashboard"
//           element={
//             <ProtectedRoute
//               element={<InstructorDashboard />}
//               requiredRole="instructor" // Only instructor can access this route
//             />
//           }
//         />
//         {/* You can add more protected routes as needed */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AdminDashboard from "./pages/AdminDashboard"; // Your protected admin dashboard
import InstructorDashboard from "./pages/InstructorDashboard"; // Your protected instructor dashboard
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* Protect dashboard routes with roles */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              requiredRole="admin" // Only admin can access this route
            />
          }
        />
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute
              element={<InstructorDashboard />}
              requiredRole="instructor" // Only instructor can access this route
            />
          }
        />
        {/* You can add more protected routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
