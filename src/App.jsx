import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import AssetDetail from "./pages/AssetDetail";
import Learn from "./pages/Learn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpType from "./pages/SignUpType";
import ScrollToTop from "./components/common/ScrollToTop";
import WarningBanner from "./components/WarningBanner";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import FooterDisclaimer from "./components/FooterDisclaimer";
import AddCrypto from "./pages/AddCrypto";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Sticky warning banner — sits above NavBar on every page */}
      <WarningBanner />

      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/assets/:id" element={<AssetDetail />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/add-crypto" element={<AddCrypto />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpType />} />
        <Route path="/signup/details" element={<SignUp />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

      </Routes>

      <FooterDisclaimer />
    </BrowserRouter>
  );
}

export default App;