import { lazy, Suspense } from "react";
import WorkRooms from "@/design-archive/work/WorkRooms";
import WorkThreeRooms from "@/components/studio/work/WorkThreeRooms";

// Selected Work.
// Two finished designs live in ./work, and this word picks the one the site
// shows. Change it to swap them:
//   "three" — Three Rooms: one project at a time as a room you step into, the
//             place blurred behind (Thresholds direction, October 2026)
//   "rooms" — Rooms: the pinned prints, one chapter per project
const LIVE = "three";

const DESIGNS = { three: WorkThreeRooms, rooms: WorkRooms };

// Older versions live in src/design-archive/work — preview them on the dev
// server with /?work=classic (the original layout) or /?work=index (the
// typographic index). /?work=three and /?work=rooms preview the two above.
// The archive previews are dev-only and loaded on demand, so they never
// enter the production build.
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
  const Design = DESIGNS[key] ?? DESIGNS[LIVE];
  return <Design />;
}
