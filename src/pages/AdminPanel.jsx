import AdminPanelSkeleton from "@/components/features/Skeletons/AdminPanelSkeleton";
import { useUpdateUserRole, useUsers } from "@/services/useUsers";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const AdminPanel = () => {
  const { data: users = [], isLoading, error } = useUsers();
  const updateRoleMutation = useUpdateUserRole();

  const handleRoleChange = (userId, newRole) => {
    const toastId = toast.loading("Updating role...");

    updateRoleMutation.mutate(
      { userId, newRole },
      {
        onSuccess: () => {
          toast.success("Role updated successfully!", { id: toastId });
        },
        onError: (error) => {
          console.error("Error updating role:", error);
          toast.error("Failed to update role. Please try again.", { id: toastId });
        },
      },
    );
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: "bg-red-500",
      frontdesk: "bg-teal-500",
      restaurant: "bg-yellow-400",
    };
    return colors[role] || "bg-gray-400";
  };

  if (error) {
    return <div className="p-4 text-red-600 sm:p-6 lg:p-8">Error loading users</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Admin Panel</h1>
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 sm:text-base">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">User Management</h2>
          </div>

          {isLoading ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase sm:text-sm">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase sm:text-sm">
                      Role
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase sm:table-cell sm:text-sm">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase sm:text-sm">
                      Change Role
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[...Array(5)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-4 py-3">
                        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-6 w-20 rounded bg-gray-200"></div>
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell">
                        <div className="h-4 w-24 rounded bg-gray-200"></div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-8 w-32 rounded bg-gray-200"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : users.length === 0 ? (
            <p className="p-6 text-gray-500">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase sm:text-sm">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase sm:text-sm">
                      Role
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase sm:table-cell sm:text-sm">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase sm:text-sm">
                      Change Role
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="max-w-xs px-4 py-3 text-xs break-all text-gray-900 sm:text-sm">{user.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded px-2 py-1 text-xs font-semibold text-white sm:text-sm ${getRoleBadgeColor(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-xs text-gray-500 sm:table-cell sm:text-sm">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          disabled={updateRoleMutation.isPending}
                          className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 sm:w-auto sm:text-sm"
                        >
                          <option value="admin">Admin</option>
                          <option value="frontdesk">Front Desk</option>
                          <option value="restaurant">Restaurant</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
