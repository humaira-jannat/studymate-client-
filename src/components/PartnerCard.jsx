import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const PartnerCard = ({ partner }) => {
  const { user, theme } = useContext(AuthContext);
  const navigate = useNavigate();

  const isOwnProfile = user?.email === partner?.email;

  const handleViewProfile = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/partner/${partner._id}`);
    }
  };

  return (
    <div
      className={`rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full ${
        theme === "dark"
          ? "bg-slate-800 text-white"
          : "bg-white text-slate-800"
      }`}
    >
      <div className="relative">
        <img
          src={partner.profileimage || "https://i.pravatar.cc/150?img=1"}
          alt={partner.name}
          className="w-full h-48 object-cover"
          onError={(e) =>
            (e.target.src = "https://i.pravatar.cc/150?img=1")
          }
        />
        <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
          {partner.studyMode}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold font-poppins">
          {partner.name}
        </h3>

        <div className="flex items-center gap-1 text-yellow-400 mt-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(partner.rating)
                  ? "text-yellow-400"
                  : "text-slate-300"
              }
              size={14}
            />
          ))}
          <span className="text-sm text-slate-500 ml-1">
            ({partner.rating})
          </span>
        </div>

        <div className="mt-3 space-y-1 text-sm flex-grow">
          <p>
            <span className="font-medium text-indigo-500">Subject:</span>{" "}
            {partner.subject}
          </p>
          <p>
            <span className="font-medium text-indigo-500">Level:</span>{" "}
            {partner.experienceLevel}
          </p>
          <p className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-indigo-400" />
            {partner.location}
          </p>
        </div>

        {isOwnProfile ? (
          <div className="mt-4 w-full py-2 rounded-xl bg-slate-200 text-slate-500 text-center text-sm font-medium">
            Your Profile
          </div>
        ) : (
          <button
            onClick={handleViewProfile}
            className="mt-4 w-full py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            View Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default PartnerCard;