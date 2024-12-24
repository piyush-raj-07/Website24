import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';

import TeamPage from './components/Teampage';
import Activities from "./components/Activities";
import Navbar from "./components/Navbar";

import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import EmailVerificationPage from "./components/EmailVerificationPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { RedirectAuthenticatedUser, RequireUnverifiedUser } from './utils/routeProtection';

function App() {
  const { isCheckingAuth, CheckAuth } = useAuthStore();

  useEffect(() => {
    CheckAuth();
  }, [CheckAuth]);

  if (isCheckingAuth) {
    return <div className="flex justify-center items-center min-h-screen">Checking authentication...</div>; //add loading animation
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/team" element={<TeamPage />} />
          <Route path="/Activities" element={<Activities />} />

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
            <EmailVerificationPage />
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
