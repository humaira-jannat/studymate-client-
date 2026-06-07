// Footer with social links and copyright
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Footer = () => {
  const { theme } = useContext(AuthContext);

  return (
    <footer
      className={`pt-12 pb-6 mt-auto ${
        theme === "dark"
          ? "bg-slate-900 text-slate-300"
          : "bg-slate-800 text-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-white">
              Study<span className="text-indigo-400">Mate</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Connect with the right study partners to boost your learning journey.
            StudyMate helps students collaborate, grow, and achieve their academic goals together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-400 transition">Home</Link></li>
            <li><Link to="/find-partners" className="hover:text-indigo-400 transition">Find Partners</Link></li>
            <li><Link to="/create-profile" className="hover:text-indigo-400 transition">Create Profile</Link></li>
            <li><Link to="/my-connections" className="hover:text-indigo-400 transition">My Connections</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-indigo-400 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-indigo-400 transition"><FaXTwitter /></a>
            <a href="#" className="hover:text-indigo-400 transition"><FaLinkedin /></a>
            <a href="#" className="hover:text-indigo-400 transition"><FaInstagram /></a>
          </div>
          <p className="text-sm mt-4 text-slate-400">
            Have questions? Reach us at<br />
            <span className="text-indigo-400">support@studymate.com</span>
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-700 pt-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} StudyMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;