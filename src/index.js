import React from "react";
import ReactDOM from "react-dom/client";
import { Home, NotFound, Sign, Login, Scoreboard, Score } from "./pages";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/score" />

        <Route
          path="/scoreboard"
          element={
            <AdminRoute>
              <Scoreboard />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  </Router>
);

reportWebVitals();
