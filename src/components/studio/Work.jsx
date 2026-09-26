import { lazy, Suspense } from "react";
import WorkRooms from "./work/WorkRooms";

// Selected Work.
// The site uses "Rooms". The original layout is kept as WorkClassic — preview
// it on the dev server with /?work=classic, or render <WorkClassic /> here to
// switch back. The preview is dev-only and loaded on demand, so the variant
// never enters the production build.
const WorkClassic = import.meta.env.DEV ? lazy(() => import("./work/WorkClassic")) : null;

export default function Work() {
  const classic =
    import.meta.env.DEV &&
    new URLSearchParams(window.location.search).get("work") === "classic";

  if (classic) {
    return (
      <Suspense fallback={null}>
        <WorkClassic />
      </Suspense>
    );
  }
  return <WorkRooms />;
}
