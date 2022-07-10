import React from "react";
import ReactDOM from "react-dom/client";
import {
  Home,
  NotFound,
  Sign,
  Login,
  Scoreboard,
  Score,
  Events,
  SingleEvent,
} from "./pages";
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
        <Route path="/admin/events" element={<Events />} />
        <Route path="/event" element={<SingleEvent />}>
          <Route path=":eventPATH" element={<SingleEvent />}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route
          path="/score"
          element={
            <ProtectedRoute>
              <Score />
            </ProtectedRoute>
          }
        />

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
