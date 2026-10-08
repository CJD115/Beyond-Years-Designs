import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { MotionConfig } from "motion/react";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import CaseStudy from "@/pages/CaseStudy";
import Cursor from "@/components/studio/Cursor";
import { useSeo } from "@/lib/seo";

// The whole homepage in the Thresholds direction (/thresholds), on the dev
// server only. In a production build import.meta.env.DEV is false, so the
// route and src/redesign are left out.
const ThresholdsHome = import.meta.env.DEV ? lazy(() => import("@/redesign/thresholds/ThresholdsHome")) : null;
// The homepage and case study before the Rooms redesign (/original and
// /original/work/:slug), dev only, from src/design-archive.
const HomeOriginal = import.meta.env.DEV ? lazy(() => import("@/design-archive/home/HomeOriginal")) : null;
const CaseStudyOriginal = import.meta.env.DEV
  ? lazy(() => import("@/design-archive/case-study/CaseStudyOriginal"))
  : null;

// The Rooms design was previewed at /rooms and /rooms/work/:slug before it
// became the homepage; old links to it land on the live pages.
function RoomsRedirect() {
  const { hash } = useLocation();
  return <Navigate to={`/${hash}`} replace />;
}

function RoomsCaseStudyRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/work/${slug}/`} replace />;
}

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
        {ThresholdsHome && (
          <Route
            path="/thresholds"
            element={
              <Suspense fallback={null}>
                <ThresholdsHome />
              </Suspense>
            }
          />
        )}
        {HomeOriginal && (
          <Route
            path="/original"
            element={
              <Suspense fallback={null}>
                <HomeOriginal />
              </Suspense>
            }
          />
        )}
        {CaseStudyOriginal && (
          <Route
            path="/original/work/:slug"
            element={
              <Suspense fallback={null}>
                <CaseStudyOriginal />
              </Suspense>
            }
          />
        )}
        <Route path="/rooms" element={<RoomsRedirect />} />
        <Route path="/rooms/work/:slug" element={<RoomsCaseStudyRedirect />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </MotionConfig>
  );
}
