// Partner details page with send partner request feature
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { FaStar, FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";

const PartnerDetails = () => {
  const { id } = useParams();
  const { user, theme } = useContext(AuthContext);
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/partners/${id}`)
      .then((res) => {
        setPartner(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSendRequest = () => {
    const requestData = {
      partnerId: partner._id,
      partnerName: partner.name,
      partnerImage: partner.profileimage,
      subject: partner.subject,
      studyMode: partner.studyMode,
      experienceLevel: partner.experienceLevel,
      location: partner.location,
      requesterEmail: user.email,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/connections`, requestData)
      .then(() => {
        // increment partner count
        return axios.patch(`${import.meta.env.VITE_API_URL}/partners/${id}/increment`);
      })
      .then(() => {
        setPartner((prev) => ({
          ...prev,
          partnerCount: (prev.partnerCount || 0) + 1,
        }));
        toast.success("Partner request sent successfully!");
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Failed to send request.";
        toast.error(msg);
      });
  };

  if (loading) return <Spinner />;
  if (!partner) return <div className="text-center py-20 text-red-500">Partner not found.</div>;

  return (
    <div className={`min-h-screen py-12 px-4 ${theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-50"}`}>
      <div className="max-w-3xl mx-auto">
        <div className={`rounded-2xl shadow-xl overflow-hidden ${theme === "dark" ? "bg-slate-800" : "bg-white"}`}>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32"></div>
          <div className="px-8 pb-8 -mt-16">
            <img
              src={partner.profileimage}
              alt={partner.name}
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
              onError={(e) => (e.target.src = "https://i.ibb.co/6b5zB6Q/default-avatar.png")}
            />
            <div className="mt-4">
              <h2 className="text-2xl font-bold font-poppins">{partner.name}</h2>
              <p className="text-indigo-500">{partner.subject}</p>

              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(partner.rating) ? "text-yellow-400" : "text-slate-300"}
                  />
                ))}
                <span className="text-sm text-slate-400 ml-1">({partner.rating})</span>
              </div>

              <div className={`grid grid-cols-2 gap-4 mt-6 text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                <div className={`p-4 rounded-xl ${theme === "dark" ? "bg-slate-700" : "bg-slate-50"}`}>
                  <p className="text-indigo-500 font-medium">Study Mode</p>
                  <p className="mt-1 font-semibold">{partner.studyMode}</p>
                </div>
                <div className={`p-4 rounded-xl ${theme === "dark" ? "bg-slate-700" : "bg-slate-50"}`}>
                  <p className="text-indigo-500 font-medium">Experience</p>
                  <p className="mt-1 font-semibold">{partner.experienceLevel}</p>
                </div>
                <div className={`p-4 rounded-xl ${theme === "dark" ? "bg-slate-700" : "bg-slate-50"}`}>
                  <p className="text-indigo-500 font-medium">Availability</p>
                  <p className="mt-1 font-semibold">{partner.availabilityTime}</p>
                </div>
                <div className={`p-4 rounded-xl ${theme === "dark" ? "bg-slate-700" : "bg-slate-50"}`}>
                  <p className="text-indigo-500 font-medium flex items-center gap-1"><FaUserFriends /> Partners</p>
                  <p className="mt-1 font-semibold">{partner.partnerCount || 0}</p>
                </div>
              </div>

              <div className={`flex items-center gap-2 mt-4 text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                <FaMapMarkerAlt className="text-indigo-400" />
                {partner.location}
              </div>

              <button
                onClick={handleSendRequest}
                className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                Send Partner Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;