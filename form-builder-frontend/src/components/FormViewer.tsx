import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// FormField component to render different types of fields dynamically
const FormField: React.FC<any> = ({ field, formData, handleChange }) => {
  switch (field.type) {
    case "text":
    case "number":
    case "date":
      return (
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">
            {field.label || "Untitled Field"}
          </label>
          <input
            type={field.type}
            name={String(field.id)} // Use field.id as the name
            value={formData[field.id]?.value || ""} // Store and retrieve the value
            onChange={handleChange}
            placeholder={field.placeholder || `Enter ${field.type}`}
            required={field.required}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
      );

    case "checkbox":
      return (
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">
            {field.label || "Untitled Field"}
          </label>
          <input
            type="checkbox"
            name={String(field.id)} // Use field.id as the name
            checked={formData[field.id]?.value || false} // Store and retrieve the value
            onChange={handleChange}
            className="h-5 w-5 border-gray-300 rounded"
          />
        </div>
      );

    case "radio":
      return (
        <div key={field.id} className="space-y-2">
          <label className="block text-gray-700 font-semibold">
            {field.label || "Untitled Field"}
          </label>
          {field.options.map((option: string, index: number) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                name={String(field.id)} // Same name for all radios in this group
                value={option}
                checked={formData[field.id]?.value === option} // Ensure only one radio button is checked in the group
                onChange={handleChange}
                className="h-5 w-5 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </div>
          ))}
        </div>
      );
    case "dropdown":
      return (
        <div key={field.id} className="space-y-2">
          <label className="block text-gray-700 font-semibold">
            {field.label || "Untitled Field"}
          </label>
          <select
            name={String(field.id)} // Use field.id as the name
            value={formData[field.id]?.value || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required={field.required}
          >
            <option value="" disabled>
              {field.placeholder || "Select an option"}
            </option>
            {field.options.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );

    default:
      return null;
  }
};


const FormViewer: React.FC = () => {

type FormData = {
  [key: string]: {
    label: string;
    value: string | boolean | Date | null;
  };
};

  const { link } = useParams(); // The unique form identifier (UUID)
  const [form, setForm] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Fetch the form data from the backend API using the form link (UUID)
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/form/${link}`);
        setForm(response.data); // Store the form data
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    if (link) {
      fetchForm();
    }
  }, [link]);

  // Handle changes to input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
  
    // Find the corresponding field object using the name (which is the field ID)
    const field = form.fields.find((field: any) => field.id.toString() === name);
  
    // If the field is found, update formData with label and value
    if (field) {
      const updatedFieldData = {
        label: field.label, // Store the label
        value: type === "checkbox" || type === "radio" ? (type === "radio" ? value : checked) : value,
      };
  
      // Update formData with the new field data
      setFormData((prevFormData : FormData) => ({
        ...prevFormData, // Spread the previous form data
        [name]: updatedFieldData, // Use field ID as the key
      }));
    }
  };
  
  

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/sub/${form.id}/submit`, formData);
      console.log(response.data.message);
      setSubmitted(true); // Show a success message
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Show loading state while the form is being fetched
  if (loading) return <div className="text-center">Loading...</div>;

  // Show message if form is not found
  if (!form) {
    return <div className="text-center">Form not found!</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-primary mb-4">{form.title}</h1>
      <p className="text-center text-gray-600 mb-6">{form.description || "No description available."}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Render each field dynamically based on its type */}
        {form.fields.map((field: any) => (
          <FormField
            key={field.id}
            field={field}
            label={field.label}
            type={field.type}
            formData={formData}
            handleChange={handleChange}
          />
        ))}

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Submit Form
        </button>
      </form>

      {/* Display success message after form submission */}
      {submitted && (
        <div className="mt-6 text-center text-green-500 font-semibold">
          Form submitted successfully!
        </div>
      )}
    </div>
  );
};

export default FormViewer;


