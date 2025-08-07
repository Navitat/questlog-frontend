import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
