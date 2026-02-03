export default function InputField({ label, type = "text", ...props }) {
  return (
    <div>
      <label htmlFor={props.id} className="mb-2 block text-sm font-semibold text-gray-900">
        {label}
      </label>
      <input
        type={type}
        className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
}
