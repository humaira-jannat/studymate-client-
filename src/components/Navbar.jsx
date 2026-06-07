// Navbar with dark light theme toggle and auth state
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, logout, theme, toggleTheme } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/");
      })
      .catch(() => toast.error("Logout failed. Try again."));
    setDropdownOpen(false);
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-medium transition-colors hover:text-indigo-500 ${
            isActive ? "text-indigo-600" : ""
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/find-partners"
        className={({ isActive }) =>
          `font-medium transition-colors hover:text-indigo-500 ${
            isActive ? "text-indigo-600" : ""
          }`
        }
      >
        Find Partners
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/create-profile"
            className={({ isActive }) =>
              `font-medium transition-colors hover:text-indigo-500 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            Create Profile
          </NavLink>
          <NavLink
            to="/my-connections"
            className={({ isActive }) =>
              `font-medium transition-colors hover:text-indigo-500 ${
                isActive ? "text-indigo-600" : ""
              }`
            }
          >
            My Connections
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav
      className={`sticky top-0 z-50 shadow-md ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold font-poppins">
            Study<span className="text-indigo-600">Mate</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">{navLinks}</div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-slate-700 transition"
          >
            {theme === "dark" ? (
              <FiSun className="text-yellow-400 text-xl" />
            ) : (
              <FiMoon className="text-slate-600 text-xl" />
            )}
          </button>

          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || "https://i.ibb.co/6b5zB6Q/default-avatar.png"}
                alt="Profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500 object-cover"
              />
              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-44 rounded-xl shadow-lg py-2 z-50 ${
                    theme === "dark"
                      ? "bg-slate-800 text-white"
                      : "bg-white text-slate-800"
                  } border border-indigo-100`}
                >
                  <p className="px-4 py-1 text-sm font-semibold text-indigo-500 truncate">
                    {user.displayName || "User"}
                  </p>
                  <hr className="my-1 border-slate-200" />
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-slate-700"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-slate-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`md:hidden px-4 pb-4 flex flex-col gap-3 ${
            theme === "dark" ? "bg-slate-900" : "bg-white"
          }`}
        >
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;