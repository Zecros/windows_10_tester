import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import routes from "tempo-routes";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Header />
        <div className="flex-grow">
          {/* Tempo routes */}
          {import.meta.env.VITE_TEMPO && useRoutes(routes)}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
            {/* Add this before any catchall route */}
            {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
