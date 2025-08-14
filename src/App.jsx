import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import QuestsPage from "./pages/QuestsPage";
import About from "./pages/About";
import { h1 } from "framer-motion/client";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        <Route
          path="/quests"
          element={
            <IsPrivate>
              <QuestsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
