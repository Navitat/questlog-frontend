import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[90vh] bg-base-200 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold mt-4">Page Not Found</p>
        <p className="mt-2 text-base-content">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary mt-6">
          Go Home
        </Link>
      </div>
    </div>
  );
}
