import React, { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, User, Calendar, BookOpen } from "lucide-react";
import Loader from "../status_pages/Loader";

export default function People() {
  const [userdata, setUserdata] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserdata = async () => {
    try {
      setLoading(true);
      console.log("Fetching Userdata...");
      const res = await axios.get("http://localhost:5000/GetAllUsers");
      console.log("Response:", res.data);
      setUserdata(res.data);
    } catch (error) {
      console.error("Error fetching Userdata:", error);
      setError("Error fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserdata();
  }, []);

  const fuse = new Fuse(userdata, {
    keys: ["Name"], 
    threshold: 0.3,  
    findAllMatches: true,
  });

  let filteredData = userdata;
  
  if (nameFilter) {
    const result = fuse.search(nameFilter);
    filteredData = result.map((r) => r.item);
  }

  if (yearFilter) {
    filteredData = filteredData.filter((item) =>
      (item.Grad_Year?.toString() || "").includes(yearFilter)
    );
  }

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark">
      <div className="flex-grow flex flex-col bg-gradient-to-br from-purple-900 to-black text-purple-100">
        <header className="bg-purple-950 py-4 px-4 sm:px-6 lg:px-8 shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-purple-300 flex items-center mb-4 sm:mb-0">
              <GraduationCap className="mr-3 text-gray-400" size={32} />
              Student Information
            </h1>
          </div>
        </header>
        <main className="flex-grow flex flex-col p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl w-full mx-auto mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Filter by name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-purple-950 border-2 border-purple-700 focus:border-purple-500 rounded-full text-purple-100 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Filter by year"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-purple-950 border-2 border-purple-700 focus:border-purple-500 rounded-full text-purple-100 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>

          {loading ? (
            <p className="text-center text-purple-300">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-grow bg-purple-950 rounded-lg sm:rounded-xl overflow-hidden shadow-xl max-w-7xl w-full mx-auto"
            >
              <div className="overflow-x-auto h-full">
                <table className="w-full h-full">
                  <thead className="bg-purple-900 sticky top-0">
                    <tr>
                      <th className="text-purple-300 font-bold p-3 sm:p-4 text-left">S.No</th>
                      <th className="text-purple-300 font-bold p-3 sm:p-4 text-left">Name</th>
                      <th className="text-purple-300 font-bold p-3 sm:p-4 text-left">Year</th>
                      <th className="text-purple-300 font-bold p-3 sm:p-4 text-left">Degree</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredData.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={index % 2 === 0 ? "bg-purple-900/50" : "bg-purple-950"}
                        >
                          <td className="p-4 sm:p-5 font-medium text-purple-300">{index + 1}</td>
                          <td className="p-4 sm:p-5 text-purple-100">
                          <Link to={`/profile/${item.id}`} className="hover:underline text-purple-400">
                            {item.Name}
                          </Link>
                            </td>
                          <td className="p-4 sm:p-5 text-purple-300">{item.Grad_Year}</td>
                          <td className="p-4 sm:p-5 text-purple-300 flex items-center">
                            <BookOpen className="mr-2 text-gray-400 flex-shrink-0" size={16} />
                            <span className="truncate">{item.Degree}</span>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
