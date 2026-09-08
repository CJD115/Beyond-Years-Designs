import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import ScrollToTop from "./components/ScrollToTop";

function PageNotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6 px-6">
      <p className="font-display text-7xl">404</p>
      <p className="text-muted-foreground">Page not found.</p>
      <a href="/" className="link-underline">Return home</a>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}