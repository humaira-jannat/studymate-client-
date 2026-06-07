import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const { login, googleLogin, theme } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => {
        toast.success("Welcome back! Login successful.");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error("Invalid email or password. Please try again.");
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        toast.success("Google login successful!");
        navigate(from, { replace: true });
      })
      .catch(() => toast.error("Google login failed. Please try again."));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 ${
        theme === "dark" ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 ${
          theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-800"
        }`}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-poppins text-indigo-600">
            Welcome Back
          </h2>
          <p className={`mt-1 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Login to your StudyMate account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 ${
                theme === "dark"
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === "dark"
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-slate-50 border-slate-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <p className="text-right mt-1">
              <span className="text-sm text-indigo-500 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-4 gap-3">
          <hr className="flex-grow border-slate-300" />
          <span className="text-sm text-slate-400">OR</span>
          <hr className="flex-grow border-slate-300" />
        </div>

        <button
          onClick={handleGoogle}
          className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl border font-medium transition hover:bg-indigo-50 ${
            theme === "dark"
              ? "border-slate-600 text-white hover:bg-slate-700"
              : "border-slate-200 text-slate-700"
          }`}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;