import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Function to convert submission data to CSV format
const convertToCSV = (submissions: any[]) => {
  const headers = ["Submission ID", "Field ID", "Label", "Value"];
  const rows = submissions.map((submission) =>
    Object.keys(submission.submissionData).map((fieldId) => {
      const fieldData = submission.submissionData[fieldId];
      return [
        submission.id,
        fieldId,
        fieldData.label || "Untitled", // Default to "Untitled" if label is empty
        fieldData.value || "No value", // Default to "No value" if value is empty
      ];
    })
  );

  // Flatten the rows and add header
  const csvContent = [headers, ...rows.flat()].map((row) => row.join(",")).join("\n");
  return csvContent;
};

const ViewSubmissions: React.FC = () => {
  const { formId } = useParams(); // The formId from the URL params
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Fetch the submissions for this form
        const submissionsResponse = await axios.get(`http://localhost:5000/api/sub/${formId}/submissions`);
        setSubmissions(submissionsResponse.data.submissions);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchSubmissions();
    }
  }, [formId]);

  // Function to handle CSV export
  const handleExportCSV = () => {
    const csvContent = convertToCSV(submissions);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "submissions.csv");
    link.click();
  };

  if (loading) return <div>Loading...</div>;

  // If no submissions found
  if (submissions.length === 0) {
    return <div>No submissions found for this form.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-primary mb-4">Submissions</h1>

      {/* Button to export data as CSV */}
      <button
        onClick={handleExportCSV}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Export as CSV
      </button>

      {submissions.map((submission: any) => (
        <div key={submission.id} className="border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold">Submission #{submission.id}</h3>
          <div className="space-y-4">
            {/* Loop through submissionData */}
            {Object.keys(submission.submissionData).map((fieldId) => {
              const fieldData = submission.submissionData[fieldId];
              return (
                <div key={fieldId} className="flex justify-between">
                  <span className="font-semibold">{fieldData.label || "Untitled Field"}</span>
                  <span>{String(fieldData.value) || "No data"}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewSubmissions;



