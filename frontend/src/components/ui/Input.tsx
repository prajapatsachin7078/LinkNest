import React, { ChangeEvent } from "react";

// Define the types for props that the Input component will accept
interface InputProps {
  label?: string; // Label for the input
  type?: string; // Type of input (text, email, password, etc.)
  value: string; // The value of the input (controlled component)
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Event handler for input changes
  placeholder?: string; // Placeholder text for the input
  error?: string; // Error message for validation
  id?: string; // Optional custom ID
  name?: string; // Optional name attribute for the input
  required?: boolean; // Optional required field
}

// Reusable Input component
const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  id,
  name,
  required = false
}: InputProps) => {
  return (
    <div className="input-container">
      {/* Label for the input */}
      <label
        htmlFor={id || name}
        className="block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input field */}
      <input
        id={id || name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required={required}
      />

      {/* Error message */}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
