import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Agents from "../pages/Agents/Agents";
import Analytics from "../pages/Analytics/Analytics";
import Projects from "../pages/Projects/Projects";
import Settings from "../pages/Settings/Settings";
import AIChat from "../pages/Chat/AIChat";

import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/agents"
          element={<Agents />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/chat"
          element={<AIChat />}
        />
      </Route>
    </Routes>
  );
}