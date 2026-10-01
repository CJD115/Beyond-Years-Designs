import { lazy, Suspense } from "react";
import WorkRooms from "./work/WorkRooms";

// Selected Work.
// The site uses "Rooms". Earlier versions live in src/design-archive/work —
// preview them on the dev server with /?work=classic (the original layout) or
// /?work=index (the typographic index). The previews are dev-only and loaded
// on demand, so the archived versions never enter the production build.
const WorkClassic = import.meta.env.DEV ? lazy(() => import("@/design-archive/work/WorkClassic")) : null;
const WorkIndex = import.meta.env.DEV
  ? lazy(() => import("@/design-archive/work/WorkIndex").then((m) => ({ default: m.WorkIndexSection })))
  : null;

export default function Work() {
  const key = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("work")?.toLowerCase()
    : null;

  const Preview = key === "classic" ? WorkClassic : key === "index" ? WorkIndex : null;
  if (Preview) {
    return (
      <Suspense fallback={null}>
        <Preview />
      </Suspense>
    );
  }
  return <WorkRooms />;
}
