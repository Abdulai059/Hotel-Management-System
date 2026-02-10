export default function AdminPanelSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="max-w-xs px-4 py-3">
        <span className="block h-4 w-full rounded bg-gray-200"></span>
      </td>

      <td className="px-4 py-3">
        <span className="inline-block h-5 w-20 rounded bg-gray-200"></span>
      </td>

      <td className="hidden px-4 py-3 sm:table-cell">
        <span className="block h-4 w-24 rounded bg-gray-200"></span>
      </td>
      <td className="px-4 py-3">
        <span className="block h-8 w-28 rounded bg-gray-200"></span>
      </td>
    </tr>
  );
}
