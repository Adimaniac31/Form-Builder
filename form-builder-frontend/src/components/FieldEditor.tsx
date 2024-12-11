import React from "react";

const FieldEditor: React.FC<{
  field: any | undefined;
  updateField: (updatedField: any) => void;
}> = ({ field, updateField }) => {
  if (!field) {
    return <p className="text-gray-500">No field selected for editing.</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    updateField({ ...field, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Label
        </label>
        <input
          type="text"
          name="label"
          value={field.label}
          onChange={handleChange}
          placeholder="Enter label"
          className="w-full p-2 border rounded focus:outline-primary"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          Placeholder
        </label>
        <input
          type="text"
          name="placeholder"
          value={field.placeholder}
          onChange={handleChange}
          placeholder="Enter placeholder"
          className="w-full p-2 border rounded focus:outline-primary"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-gray-700 font-semibold">
          <input
            type="checkbox"
            name="required"
            checked={field.required}
            onChange={(e) =>
              updateField({ ...field, required: e.target.checked })
            }
            className="rounded focus:outline-primary"
          />
          Required
        </label>
      </div>

      {(field.type === "dropdown" || field.type === "radio") && (
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Options
          </label>
          <div className="space-y-2">
            {field.options.map((option: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...field.options];
                    updatedOptions[index] = e.target.value;
                    updateField({ ...field, options: updatedOptions });
                  }}
                  className="flex-1 p-2 border rounded focus:outline-primary"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedOptions = [...field.options];
                    updatedOptions.splice(index, 1);
                    updateField({ ...field, options: updatedOptions });
                  }}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              updateField({ ...field, options: [...field.options, "New Option"] })
            }
            className="mt-2 px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/90"
          >
            Add Option
          </button>
        </div>
      )}
    </div>
  );
};

export default FieldEditor;


