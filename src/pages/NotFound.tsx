
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold mt-4 mb-6">Page not found</p>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you were looking for. The link might be broken, or the page may have been removed.
        </p>
        <Button asChild className="bg-gradient-to-r from-primary to-accent text-white">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
