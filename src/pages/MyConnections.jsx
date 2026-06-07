// My connections page with update modal and delete confirmation
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyConnections = () => {
  const { user, theme } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);

  const fetchConnections = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/connections?email=${user.email}`)
      .then((res) => {
        // Fix: ensure it's always an array
        const data = Array.isArray(res.data) ? res.data : [];
        setConnections(data);
        setLoading(false);
      })
      .catch(() => {
        setConnections([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.email) fetchConnections();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This connection will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, remove it!",
      background: theme === "dark" ? "#1e293b" : "#fff",
      color: theme === "dark" ? "#e2e8f0" : "#1e293b",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/connections/${id}`)
          .then(() => {
            setConnections((prev) => prev.filter((c) => c._id !== id));
            toast.success("Connection removed successfully.");
          })
          .catch(() => toast.error("Failed to delete. Try again."));
      }
    });
  };

  const handleUpdate = (connection) => {
    setEditData({ ...connection });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/connections/${editData._id}`,
        editData
      )
      .then(() => {
        toast.success("Connection updated successfully!");
        setEditData(null);
        fetchConnections();
      })
      .catch(() => toast.error("Update failed. Please try again."));
  };

  if (loading) return <Spinner />;

  const inputClass = `w-full px-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${
    theme === "dark"
      ? "bg-slate-700 border-slate-600 text-white"
      : "bg-slate-50 border-slate-200 text-slate-800"
  }`;

  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold font-poppins text-indigo-600 mb-2">
          My Connections
        </h2>
        <p
          className={`text-sm mb-6 ${
            theme === "dark" ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Manage all your partner requests here
        </p>

        {connections.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-400">
              No connections yet. Start by sending a partner request!
            </p>
          </div>
        ) : (
          <div
            className={`rounded-2xl shadow-xl overflow-hidden ${
              theme === "dark" ? "bg-slate-800" : "bg-white"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead
                  className={
                    theme === "dark" ? "bg-slate-700" : "bg-indigo-50"
                  }
                >
                  <tr>
                    <th className="px-4 py-3 text-left">Partner</th>
                    <th className="px-4 py-3 text-left">Subject</th>
                    <th className="px-4 py-3 text-left">Study Mode</th>
                    <th className="px-4 py-3 text-left">Level</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {connections.map((conn) => (
                    <tr
                      key={conn._id}
                      className={`border-t ${
                        theme === "dark"
                          ? "border-slate-700 hover:bg-slate-700"
                          : "border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={conn.partnerImage}
                            alt={conn.partnerName}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) =>
                              (e.target.src =
                                "https://i.pravatar.cc/40?img=1")
                            }
                          />
                          <span className="font-medium">{conn.partnerName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{conn.subject}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                          {conn.studyMode}
                        </span>
                      </td>
                      <td className="px-4 py-3">{conn.experienceLevel}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleUpdate(conn)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(conn._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
              className={`w-full max-w-md rounded-2xl shadow-2xl p-6 ${
                theme === "dark"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-800"
              }`}
            >
              <h3 className="text-xl font-bold font-poppins text-indigo-600 mb-4">
                Update Connection
              </h3>
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <input
                    name="subject"
                    value={editData.subject}
                    onChange={handleEditChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Study Mode</label>
                  <select
                    name="studyMode"
                    value={editData.studyMode}
                    onChange={handleEditChange}
                    className={inputClass}
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={editData.experienceLevel}
                    onChange={handleEditChange}
                    className={inputClass}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditData(null)}
                    className="flex-1 py-2 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyConnections;