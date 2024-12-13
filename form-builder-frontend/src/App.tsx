// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import FormViewer from "./components/FormViewer";
import Signup from "./components/SignUp";
import Signin from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import EditFormPage from "./components/EditFormPage";
import ViewSubmissions from "./components/ViewSubmissions";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-form" element={<FormBuilder />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/edit-form/:formId" element={<EditFormPage />} />
        <Route path="/form/:link" element={<FormViewer />} />
        <Route path="/view-submissions/:formId" element={<ViewSubmissions />} />
      </Routes>
    </Router>
  );
};

export default App;