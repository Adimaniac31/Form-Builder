import React, { useState } from "react";
import FieldItem from "./FieldItem";
import FieldEditor from "./FieldEditor";
import axios from "axios";

const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<any[]>([]);
  const [selectedField, setSelectedField] = useState<number | null>(null);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
    if (selectedField === id) setSelectedField(null);
  };

  const updateField = (id: number, updatedField: any) => {
    setFields(fields.map((field) => (field.id === id ? updatedField : field)));
  };

  const moveField = (dragIndex: number, hoverIndex: number) => {
    const draggedField = fields[dragIndex];
    const updatedFields = [...fields];
    updatedFields.splice(dragIndex, 1);
    updatedFields.splice(hoverIndex, 0, draggedField);
    setFields(updatedFields);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/forms", {
        title: formTitle,
        description: formDescription,
        fields,
      });
      setShareableLink(response.data.shareableLink);
      setLoading(false);
    } catch (error) {
      console.error("Error creating form:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Left: Form Editor */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-primary mb-4">Form Builder</h1>
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
        <div>
      <button
        onClick={handleSubmit}
        className="w-48 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={loading || !formTitle}
      >
        {loading ? "Saving..." : "Save Form"}
      </button>

      {shareableLink && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Shareable Link:</h2>
          <input
            type="text"
            value={shareableLink}
            readOnly
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => navigator.clipboard.writeText(shareableLink)}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Copy Link
          </button>
        </div>
      )}
      </div>
      </div>

      {/* Right: Field Editor */}
      <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-secondary mb-4">
          Field Properties
        </h2>
        {selectedField !== null ? (
          <FieldEditor
            field={fields.find((f) => f.id === selectedField)}
            updateField={(updatedField) =>
              updateField(selectedField, updatedField)
            }
          />
        ) : (
          <p className="text-gray-500">Select a field to edit its properties</p>
        )}
      </div>

    </div>
  );
};

export default FormBuilder;




