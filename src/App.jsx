import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "motion/react";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import CaseStudy from "@/pages/CaseStudy";
import Cursor from "@/components/studio/Cursor";
import NotFound from "@/components/studio/NotFound";
import { useSeo } from "@/lib/seo";

function PageNotFound() {
  useSeo({
    title: "Page not found | Beyond Years Designs",
    description: "The page you were looking for could not be found.",
    noindex: true,
  });

  return <NotFound />;
}

// The router comes from outside: BrowserRouter in the browser (main.jsx),
// StaticRouter when pages are prerendered at build time (entry-server.jsx).
export default function App() {
  return (
    // "user": when the visitor asks the OS for reduced motion, Motion skips
    // movement (slides, reveals) and keeps only fades.
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </MotionConfig>
  );
}
