// Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex justify-around text-white">
        <li>
          <Link to="/" className="hover:text-gray-200">Dashboard</Link>
        </li>
        <li>
          <Link to="/create-form" className="hover:text-gray-200">Create Form</Link>
        </li>
        <li>
          <Link to="/signup" className="hover:text-gray-200">Sign Up</Link>
        </li>
        <li>
          <Link to="/signin" className="hover:text-gray-200">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
