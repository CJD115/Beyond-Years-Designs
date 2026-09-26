import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "motion/react";
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import CaseStudy from '@/pages/CaseStudy';
import Cursor from '@/components/studio/Cursor';
import { useSeo } from '@/lib/seo';

function PageNotFound() {
  useSeo({
    title: "Page not found | Beyond Years Designs",
    description: "The page you were looking for could not be found.",
    noindex: true,
  });

  return (
    <main id="content" className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6 px-6">
      <p className="font-display text-7xl">404</p>
      <p className="text-muted-foreground">Page not found.</p>
      <a href="/" className="link-underline">Return home</a>
    </main>
  );
}

export default function App() {
  return (
    // "user": when the visitor asks the OS for reduced motion, Motion skips
    // movement (slides, reveals) and keeps only fades.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <Cursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
