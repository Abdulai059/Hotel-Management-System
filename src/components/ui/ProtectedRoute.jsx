import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../authentication/useUser";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) return children;

  return null;
}

export default ProtectedRoute;
