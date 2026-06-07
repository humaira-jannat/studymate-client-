import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const NotFound = () => {
  const { theme } = useContext(AuthContext);
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 text-center ${theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-800"}`}>
      <div className="text-9xl font-bold text-indigo-600 opacity-20 select-none">404</div>
      <h2 className="text-4xl font-bold font-poppins -mt-8 mb-4">Page Not Found</h2>
      <p className={`text-lg mb-8 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;