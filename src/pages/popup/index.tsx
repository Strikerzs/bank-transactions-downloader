import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "./index.css";
import "../../assests/css/reset.css";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import SelectABank from "./routes/SelectABank";
import Home from "./components/Home";
import Landing from "./routes/Landing";
import PrivacyPolicy from "./routes/PrivacyPolicy";
import HowsItsDone from "./routes/HowItsDone";
import About from "./routes/About";
import Contact from "./routes/Contact";
import Contribute from "./routes/Contribute";
import ReportABug from "./routes/ReportABug";
import SupportedBanks from "./routes/SupportedBanks";

const init = () => {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("No root element found");
  }
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route index element={<Home />} />
            <Route path="select-a-bank" element={<SelectABank />} />
            <Route path="app" element={<App />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="how-its-done" element={<HowsItsDone />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="contribute" element={<Contribute />} />
            <Route path="report-a-bug" element={<ReportABug />} />
            <Route path="supported-banks" element={<SupportedBanks />} />
          </Route>
        </Routes>
      </Router>
    </StrictMode>
  );
};

init();
