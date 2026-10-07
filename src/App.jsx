import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "motion/react";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import CaseStudy from "@/pages/CaseStudy";
import Cursor from "@/components/studio/Cursor";
import { useSeo } from "@/lib/seo";

// The redesign preview (/preview), on the dev server only. In a production
// build import.meta.env.DEV is false, so the route and src/redesign are left out.
const RedesignHome = import.meta.env.DEV ? lazy(() => import("@/redesign/RedesignHome")) : null;

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
        {RedesignHome && (
          <Route
            path="/preview"
            element={
              <Suspense fallback={null}>
                <RedesignHome />
              </Suspense>
            }
          />
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </MotionConfig>
  );
}
