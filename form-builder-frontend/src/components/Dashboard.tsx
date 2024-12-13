import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  // Fetch forms for the user
  const fetchForms = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/forms", {
        params: { userId }, // Pass userId as a query parameter
      });
      setForms(response.data.forms);
    } catch (error: any) {
      console.error("Error fetching forms:", error);
      setErrorMessage(error.response?.data?.message || "Failed to fetch forms.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a form
  const deleteForm = async (formId: string) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/delete-form/${formId}`, {
        data: { userId }, // Pass userId in the request body
      });
      setForms(forms.filter((form) => form.id !== formId)); // Remove the deleted form from state
    } catch (error: any) {
      console.error("Error deleting form:", error);
      setErrorMessage(error.response?.data?.message || "Failed to delete form.");
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary">Dashboard</h1>
      <button
        onClick={() => navigate("/create-form")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        Create New Form
      </button>

      {/* Error message */}
      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

      {/* Loading state */}
      {loading ? (
        <p>Loading forms...</p>
      ) : forms.length === 0 ? (
        <p>No forms found. Create your first form!</p>
      ) : (
        <div className="space-y-4">
          {forms.map((form) => (
            <div key={form.id} className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-bold">{form.title}</h2>
              <p className="text-gray-700">{form.description || "No description provided."}</p>
              <p className="text-gray-600">
                Submissions: <strong>{form.submissionCount}</strong>
              </p>
              <p className="text-gray-600">
                Shareable Link:{" "}
                <a href={form.shareableLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {form.shareableLink}
                </a>
              </p>
              <div className="flex items-center gap-4 mt-4">
                {/* Edit Form */}
                <button
                  onClick={() => navigate(`/edit-form/${form.id}`)} // Redirect to edit page
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                {/* Delete Form */}
                <button
                  onClick={() => deleteForm(form.id)} // Delete the form
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>

                {/* View Submissions */}
                <button
                  onClick={() => navigate(`/view-submissions/${form.id}`)} // Navigate to View Submissions page
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  View Submissions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;



