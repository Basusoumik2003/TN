import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import AdminNavbar from "./components/AdminNavbar"; 
import AdminDashboard from "./pages/AdminDashboard"; // 
import Overview from "./pages/Overview";
import Users from "./pages/Users";
import Support from "./pages/Support";
import Security from "./pages/Security";
import Configuration from "./pages/Configuration";
import Analytics from "./pages/Analytics";
import CareerManagement from "./pages/CareerManagement";
import CaseStudyManagement from "./pages/CaseStudyManagement";





const App = () => {
  return (
    <Router>
      {/* Header stays at the top */}
      <AdminHeader />

      {/* Small space between header and navbar */}
      <div style={{ marginTop: "5px" }}></div>

      {/* Navbar below the header */}
      <AdminNavbar />

      {/* Page Content */}
      <main className="page-content">
        <Routes>
          {/* Dashboard Home */}
          <Route path="/" element={<AdminDashboard />} />

          {/* Overview page route */}
          <Route path="/overview" element={<Overview />} />

          {/* Other routes */}
          <Route path="/users" element={<Users />} />
          <Route path="/support" element={<Support />} />
          <Route path="/security" element={<Security />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/case-study-management" element={<CaseStudyManagement />} />
          <Route path="/career-management" element={<CareerManagement />} />

        </Routes>
      </main>
    </Router>
  );
};

export default App;
