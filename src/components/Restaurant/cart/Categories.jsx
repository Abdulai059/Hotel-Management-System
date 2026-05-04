const categories = ["All", "Local Dishes", "Rice", "Soup", "Drinks", "Grill"];

export default function Categories() {
  return (
    <div className="flex flex-col gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className="rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
