import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { EnquiryPage } from "./pages/EnquiryPage";
import { HomePage } from "./pages/HomePage";
import { PaymentPage } from "./pages/PaymentPage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { ServicesPage } from "./pages/ServicesPage";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-steel-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/enquiry" element={<EnquiryPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
