import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Blogs from "./components/Blogs";
import BlogDetails from "./components/BlogDetails";
import TeamPage from './components/Teampage';
import Activities from "./components/Activities";
import Navbar from "./components/Navbar";
import Loader from './components/status_pages/Loader'
import NotFound from "./components/status_pages/NotFound";


import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import EmailVerificationPage from "./components/EmailVerificationPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { RedirectAuthenticatedUser, RequireUnverifiedUser } from './utils/routeProtection';
import ProfilePage from "./components/ProfilePage"
import AdminPanel from "./components/AdminPanel";
import WriteBlog from "./components/WriteBlog";
import MyBlog from "./components/MyBlogs";
import EditBlog from "./components/EditBlog";
import ProjectTable from "/Users/aniket/coding/eesa/Website24/client/src/components/Project.js";
import Gallery from "./components/Gallery";
function App() {
  const { isCheckingAuth, CheckAuth } = useAuthStore();

  useEffect(() => {
    CheckAuth();
  }, [CheckAuth]);

  if (isCheckingAuth) {

    return (
      <div className="h-screen bg-black flex justify-center items-center ">
        <Loader />
      </div>
    );

  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="*" element={<NotFound/>} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/Activities" element={<Activities />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path='/Blogs/:cat' element={<BlogDetails />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/writeBlog' element={<WriteBlog />} />
          <Route path='/myblog' element={<MyBlog />} />
          <Route path='/edit/:id' element={<EditBlog />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Projects" element={<ProjectTable />} />




          <Route path="/signup" element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/login" element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/verify-email" element={
            <RequireUnverifiedUser>
              <EmailVerificationPage />
            </RequireUnverifiedUser>
          } />
          <Route path="/forgot-password" element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/reset-password/:token" element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          } />


        </Routes>

        <Toaster />
      </div>
    </Router>
  );
}

export default App;
