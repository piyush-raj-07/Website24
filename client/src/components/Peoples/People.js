import React, { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, User, Calendar, BookOpen } from "lucide-react";
import Loader from "../status_pages/Loader";
import Sidebar from "../Sidebar";

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
      const res = await axios.get(`${process.env.REACT_APP_API}/GetAllUsers`);
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
    <div className="min-h-screen flex flex-col bg-black text-purple-100">
      <Sidebar/>
      <div className="flex-grow flex flex-col bg-black text-purple-100">
        <header className="bg-gradient-to-b from-purple-950 to-black py-4 px-4 sm:px-6 lg:px-8 shadow-lg border-b border-purple-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">

            <h1 className="text-2xl sm:text-3xl font-bold text-purple-400 flex items-center mb-4 sm:mb-0">
              <GraduationCap className="mr-3 text-purple-500" size={32} />

              Student Information
            </h1>
          </div>
        </header>
        <main className="flex-grow flex flex-col font-libre p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl w-full mx-auto mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Filter by name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-purple-950 border-2 border-purple-700 focus:border-purple-500 rounded-full text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-md"
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Filter by year"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-purple-950 border-2 border-purple-700 focus:border-purple-500 rounded-full text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-md"
              />
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-grow bg-gradient-to-b from-purple-900 to-purple-950 border border-purple-800 rounded-lg overflow-hidden shadow-2xl max-w-7xl w-full mx-auto"
          >
            <div className="overflow-x-auto h-full">
              <table className="w-full h-full text-left">
                <thead className="bg-gradient-to-b from-purple-800 to-purple-900 text-purple-300">
                  <tr>
                    <th className="font-bold p-4 sm:p-5 border-b border-purple-700">S.No</th>
                    <th className="font-bold p-4 sm:p-5 border-b border-purple-700">Name</th>
                    <th className="font-bold p-4 sm:p-5 border-b border-purple-700">Year</th>
                    <th className="font-bold p-4 sm:p-5 border-b border-purple-700">Degree</th>
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
                        className={index % 2 === 0 ? "bg-gradient-to-r from-purple-950 to-purple-900 hover:bg-purple-800 transition duration-300" : "bg-gradient-to-r from-purple-900 to-purple-950 hover:bg-purple-800 transition duration-300"}
                      >
                        <td className="p-4 sm:p-5 font-medium text-purple-300 border-b border-purple-800">{index + 1}</td>
                        <td className="p-4 sm:p-5 text-purple-100 border-b border-purple-800">
                          <Link to={`/profile/${item._id}`} className="hover:underline text-purple-400 transition duration-200">
                            {item.Name}
                          </Link>
                        </td>
                        <td className="p-4 sm:p-5 text-purple-300 border-b border-purple-800">{item.Grad_Year}</td>
                        <td className="p-4 sm:p-5 text-purple-300 border-b border-purple-800 flex items-center">
                          <BookOpen className="mr-2 text-purple-500 flex-shrink-0" size={18} />
                          <span className="truncate">{item.Degree}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
