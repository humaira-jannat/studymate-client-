import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import PartnerCard from "../components/PartnerCard";
import Spinner from "../components/Spinner";
import axios from "axios";
import { FaArrowRight, FaSearch, FaUsers, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Find Your Perfect Study Partner",
    subtitle: "Connect with students who share your goals and subjects.",
    bg: "from-indigo-600 to-purple-600",
  },
  {
    title: "Learn Better, Together",
    subtitle: "Study smarter with the right partner by your side.",
    bg: "from-cyan-500 to-blue-600",
  },
  {
    title: "Build Your Learning Network",
    subtitle: "Create your profile and start connecting today.",
    bg: "from-emerald-500 to-teal-600",
  },
];

const Home = () => {
  const { theme } = useContext(AuthContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [topPartners, setTopPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/partners?sort=rating`)
      .then((res) => {
        // Fix: ensure it's always an array
        const data = Array.isArray(res.data) ? res.data : [];
        setTopPartners(data.slice(0, 6));
        setLoading(false);
      })
      .catch(() => {
        setTopPartners([]);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero Carousel */}
      <div
        className={`bg-gradient-to-r ${slides[currentSlide].bg} text-white transition-all duration-700`}
      >
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {slides[currentSlide].subtitle}
          </p>
          <Link
            to="/find-partners"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-indigo-50 transition"
          >
            Get Started <FaArrowRight />
          </Link>
          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === currentSlide ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Top Study Partners */}
      <section
        className={`py-16 px-4 ${
          theme === "dark" ? "bg-slate-900" : "bg-slate-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-poppins text-indigo-600">
              Top Study Partners
            </h2>
            <p
              className={`mt-2 ${
                theme === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Connect with our highest-rated study partners
            </p>
          </div>
          {loading ? (
            <Spinner />
          ) : topPartners.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-slate-400 text-lg">
                No partners yet. Be the first to create a profile!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPartners.map((partner) => (
                <PartnerCard key={partner._id} partner={partner} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link
              to="/find-partners"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition"
            >
              View All Partners <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className={`py-16 px-4 ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-poppins text-indigo-600">
              How It Works
            </h2>
            <p
              className={`mt-2 ${
                theme === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Three simple steps to find your study partner
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaSearch className="text-4xl text-indigo-500" />,
                title: "Search Partners",
                desc: "Browse through profiles and find partners who match your subject and learning style.",
              },
              {
                icon: <FaUsers className="text-4xl text-indigo-500" />,
                title: "Send a Request",
                desc: "Send a partner request to connect with your ideal study partner.",
              },
              {
                icon: <FaStar className="text-4xl text-indigo-500" />,
                title: "Start Learning",
                desc: "Collaborate, share resources, and achieve your academic goals together.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl text-center shadow-md hover:shadow-lg transition ${
                  theme === "dark" ? "bg-slate-700" : "bg-slate-50"
                }`}
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold font-poppins mb-2">
                  {step.title}
                </h3>
                <p
                  className={
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className={`py-16 px-4 ${
          theme === "dark" ? "bg-slate-900" : "bg-indigo-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-poppins text-indigo-600">
              What Students Say
            </h2>
            <p
              className={`mt-2 ${
                theme === "dark" ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Real stories from real students
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rafi Ahmed",
                role: "Computer Science Student",
                text: "StudyMate helped me find the perfect partner for my algorithms course. My grades improved dramatically!",
                avatar: "https://i.pravatar.cc/60?img=1",
              },
              {
                name: "Nadia Islam",
                role: "Mathematics Student",
                text: "I was struggling with calculus until I found a study partner through StudyMate. Highly recommend!",
                avatar: "https://i.pravatar.cc/60?img=5",
              },
              {
                name: "Tanvir Hossain",
                role: "Physics Student",
                text: "The platform is so easy to use. Found a study group within minutes and we meet weekly now.",
                avatar: "https://i.pravatar.cc/60?img=3",
              },
            ].map((t, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl shadow-md ${
                  theme === "dark" ? "bg-slate-800" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-indigo-500">{t.role}</p>
                  </div>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  "{t.text}"
                </p>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, j) => (
                    <FaStar key={j} className="text-yellow-400" size={12} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;