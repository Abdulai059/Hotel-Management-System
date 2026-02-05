export default function SelectField({ label, options, ...props }) {
  return (
    <div>
      <label htmlFor={props.id} className="mb-2 block text-sm font-semibold text-gray-900">
        {label}
      </label>
      <select
        className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 ring-sky-500 focus:ring-2 focus:ring-sky-500"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
