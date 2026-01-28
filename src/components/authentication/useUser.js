import { useState, useEffect } from "react";

export function useUser() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // simulate loading (API call)
        const timer = setTimeout(() => {
            const auth = localStorage.getItem("isAuthenticated");
            setIsAuthenticated(auth === "true");
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return { isLoading, isAuthenticated };
}
