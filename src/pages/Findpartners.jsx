// Find partners page with search by subject and sort by experience
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PartnerCard from "../components/PartnerCard";
import Spinner from "../components/Spinner";
import { AuthContext } from "../Context/AuthContext";
import { FiSearch } from "react-icons/fi";

const FindPartners = () => {
  const { theme } = useContext(AuthContext);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const fetchPartners = () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (sort) params.sort = sort;

    axios
      .get(`${import.meta.env.VITE_API_URL}/partners`, { params })
      .then((res) => {
        // Fix: ensure it's always an array
        const data = Array.isArray(res.data) ? res.data : [];
        setPartners(data);
        setLoading(false);
      })
      .catch(() => {
        setPartners([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPartners();
  }, [sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPartners();
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-poppins text-indigo-600">
            Find Study Partners
          </h2>
          <p
            className={`mt-2 ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Search and connect with the perfect study partner
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 justify-between items-center">
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 ${
              theme === "dark"
                ? "bg-slate-800 border-slate-600 text-white"
                : "bg-white border-slate-200 text-slate-700"
            }`}
          >
            <option value="">Sort by Experience</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by subject..."
              className={`px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64 ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-600 text-white"
                  : "bg-white border-slate-200 text-slate-700"
              }`}
            />
            <button
              type="submit"
              className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <FiSearch /> Search
            </button>
          </form>
        </div>

        {loading ? (
          <Spinner />
        ) : partners.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-400">
              No partners found. Try a different search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <PartnerCard key={partner._id} partner={partner} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPartners;