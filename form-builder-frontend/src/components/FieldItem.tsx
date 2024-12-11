import React from "react";
import { useDrag, useDrop } from "react-dnd";

const FieldItem: React.FC<{
  field: any;
  index: number;
  moveField: (dragIndex: number, hoverIndex: number) => void;
  removeField: (id: number) => void;
  onSelect: () => void;
}> = ({ field, index, moveField, removeField, onSelect }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: "field",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "field",
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveField(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="flex items-center justify-between gap-4 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex-1">
        <label className="block text-gray-700 font-semibold mb-1">
          {field.label || "Untitled Field"}
        </label>
        <input
          type={field.type}
          placeholder={field.placeholder || "Placeholder"}
          disabled
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeField(field.id);
        }}
        className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-all duration-200"
      >
        Remove
      </button>
    </div>
  );
};

export default FieldItem;


