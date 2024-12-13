import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FieldItem from "./FieldItem";
import FieldEditor from "./FieldEditor";

const EditFormPage: React.FC = () => {
  const { formId } = useParams();
  const [fields, setFields] = useState<any[]>([]);
  const [selectedField, setSelectedField] = useState<number | null>(null);
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/findForm/${formId}`);
        const { title, description, fields } = response.data.form;
        setFormTitle(title);
        setFormDescription(description);
        setFields(fields || []);
      } catch (error) {
        console.error("Error fetching form:", error);
        setErrorMessage("Failed to load form data.");
      } finally {
        setLoading(false);
      }
    };

    if (formId) fetchForm();
  }, [formId]);

  // Add a new field
  const addField = (type: string) => {
    const newField = {
      id: Date.now(),
      type,
      label: "",
      placeholder: "",
      required: false,
      options: type === "dropdown" || type === "radio" ? ["Option 1"] : undefined,
    };
    setFields([...fields, newField]);
  };

  // Remove a field
  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
    if (selectedField === id) setSelectedField(null);
  };

  // Update a field
  const updateField = (id: number, updatedField: any) => {
    setFields(fields.map((field) => (field.id === id ? updatedField : field)));
  };

  // Reorder fields
  const moveField = (dragIndex: number, hoverIndex: number) => {
    const draggedField = fields[dragIndex];
    const updatedFields = [...fields];
    updatedFields.splice(dragIndex, 1);
    updatedFields.splice(hoverIndex, 0, draggedField);
    setFields(updatedFields);
  };

  // Save changes to the form
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/edit-form/${formId}`, {
        title: formTitle,
        description: formDescription,
        fields,
      });
      alert("Form updated successfully.");
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save form.");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  if (errorMessage) return <div className="text-center text-red-500">{errorMessage}</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Left Panel: Form Editor */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-primary mb-4">Edit Form</h1>

        {/* Error message */}
        {errorMessage && (
          <div className="text-red-600 mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Form Title and Description */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Form Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded focus:outline-primary"
          />
          <textarea
            placeholder="Form Description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-primary"
          ></textarea>
        </div>

        {/* Add Fields Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["text", "number", "date", "checkbox", "dropdown", "radio"].map((type) => (
            <button
              key={type}
              onClick={() => addField(type)}
              className="px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/90"
            >
              Add {type.charAt(0).toUpperCase() + type.slice(1)} Input
            </button>
          ))}
        </div>

        {/* Field List */}
        <div className="space-y-2">
          {fields.map((field, index) => (
            <FieldItem
              key={field.id}
              field={field}
              index={index}
              moveField={moveField}
              removeField={removeField}
              onSelect={() => setSelectedField(field.id)}
            />
          ))}
        </div>

        {/* Save Button */}
        <div>
          <button
            onClick={handleSave}
            className="w-48 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Right Panel: Field Editor */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-secondary mb-4">Field Properties</h2>
        {selectedField !== null ? (
          <FieldEditor
            field={fields.find((f) => f.id === selectedField)}
            updateField={(updatedField) => updateField(selectedField, updatedField)}
          />
        ) : (
          <p className="text-gray-500">Select a field to edit its properties.</p>
        )}
      </div>
    </div>
  );
};

export default EditFormPage;

