import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProfile = () => {
  const { user, theme } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    profileimage: "",
    subject: "",
    studyMode: "Online",
    availabilityTime: "",
    location: "",
    experienceLevel: "Beginner",
    rating: 0,
    partnerCount: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, email: user.email };

    axios
      .post(`${import.meta.env.VITE_API_URL}/partners`, data)
      .then(() => {
        toast.success("Study profile created successfully!");
        setFormData({
          name: "",
          profileimage: "",
          subject: "",
          studyMode: "Online",
          availabilityTime: "",
          location: "",
          experienceLevel: "Beginner",
          rating: 0,
          partnerCount: 0,
        });
      })
      .catch(() => toast.error("Failed to create profile. Please try again."));
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 ${
    theme === "dark"
      ? "bg-slate-700 border-slate-600 text-white"
      : "bg-slate-50 border-slate-200 text-slate-800"
  }`;

  return (
    <div className={`min-h-screen py-12 px-4 ${theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-50"}`}>
      <div className="max-w-2xl mx-auto">
        <div className={`rounded-2xl shadow-xl p-8 ${theme === "dark" ? "bg-slate-800" : "bg-white"}`}>
          <h2 className="text-3xl font-bold font-poppins text-indigo-600 mb-2">
            Create Study Profile
          </h2>
          <p className={`text-sm mb-6 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Fill in your details to find the perfect study partners
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input name="name" required value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Profile Image URL</label>
                <input name="profileimage" value={formData.profileimage} onChange={handleChange} placeholder="https://..." className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input name="subject" required value={formData.subject} onChange={handleChange} placeholder="e.g., Mathematics, Physics" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Study Mode</label>
                <select name="studyMode" value={formData.studyMode} onChange={handleChange} className={inputClass}>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Availability Time</label>
                <input name="availabilityTime" required value={formData.availabilityTime} onChange={handleChange} placeholder="e.g., Evening 6–9 PM" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input name="location" required value={formData.location} onChange={handleChange} placeholder="City, Country" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Experience Level</label>
                <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className={inputClass}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating (0–5)</label>
                <input type="number" name="rating" min="0" max="5" step="0.1" value={formData.rating} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" value={user?.email} readOnly className={`${inputClass} opacity-60 cursor-not-allowed`} />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition mt-2"
            >
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;