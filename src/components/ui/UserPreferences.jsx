import { useAuth } from "@/context/AuthContext";

export default function UserPreferences() {
  const { preferences, setPreferences, sessionInfo } = useAuth();

  const handleThemeChange = (theme) => {
    setPreferences({
      ...preferences,
      theme
    });
  };

  const handleLanguageChange = (language) => {
    setPreferences({
      ...preferences,
      language
    });
  };

  const handleRememberMeToggle = () => {
    setPreferences({
      ...preferences,
      rememberMe: !preferences.rememberMe
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">User Preferences</h3>
      
      <div className="space-y-4">
        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            value={preferences.theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={preferences.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        {/* Remember Me Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={preferences.rememberMe}
            onChange={handleRememberMeToggle}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-700">
            Remember me
          </label>
        </div>

        {/* Session Info */}
        {sessionInfo && (
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Session Info</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>User ID: {sessionInfo.userId}</p>
              <p>Email: {sessionInfo.email}</p>
              <p>Last Login: {new Date(sessionInfo.lastLogin).toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Last Visited Page */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Navigation</h4>
          <p className="text-xs text-gray-600">
            Last visited: {preferences.lastVisitedPage}
          </p>
        </div>
      </div>
    </div>
  );
}
