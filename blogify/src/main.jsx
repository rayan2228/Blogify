import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import BlogsProvider from "./providers/BlogsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BlogsProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </BlogsProvider>
  </React.StrictMode>
);
