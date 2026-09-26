import { lazy, Suspense } from "react";
import VisionAnnotated from "./vision/VisionAnnotated";

// Our Vision.
// The site uses "Annotated" (the marked-up proof with margin notes). The other
// versions are kept as components — preview them on the dev server with
// /?vision=original or /?vision=read, or render one here to switch. The
// previews are dev-only and loaded on demand, so the variants (and anything
// they import) never enter the production build.
const VisionOriginal = import.meta.env.DEV ? lazy(() => import("./vision/VisionOriginal")) : null;
const VisionReadSlowly = import.meta.env.DEV ? lazy(() => import("./vision/VisionReadSlowly")) : null;

export default function StatementSection() {
  const key = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("vision")?.toLowerCase()
    : null;

  const Preview = key === "original" ? VisionOriginal : key === "read" ? VisionReadSlowly : null;
  if (Preview) {
    return (
      <Suspense fallback={null}>
        <Preview />
      </Suspense>
    );
  }
  return <VisionAnnotated />;
}
