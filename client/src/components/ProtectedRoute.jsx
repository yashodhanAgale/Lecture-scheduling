import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for validation

const ProtectedRoute = ({ element, requiredRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve the user object from localStorage
  const userRole = user ? user.role : null; // Get the role from the user object

  // If there's a token and the role matches or there's no role requirement, show the element.
  // Otherwise, redirect to the login page.
  return token && (!requiredRole || requiredRole === userRole) ? (
    element
  ) : (
    <Navigate to="/" />
  );
};

// Prop validation
ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired, // Ensures 'element' is a React element
  requiredRole: PropTypes.string, // 'requiredRole' is optional and should be a string if provided
};

export default ProtectedRoute;
