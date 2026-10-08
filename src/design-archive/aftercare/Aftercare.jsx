import { lazy, Suspense } from "react";
import AftercareNewGame from "@/components/studio/aftercare/AftercareNewGame";

// Aftercare ("Beyond launch"), shown straight after Process.
// The site uses "New Game+", the equipment screen. Earlier versions live in
// src/design-archive/aftercare — preview them on the dev server with
// /?aftercare=note (the handover note), /?aftercare=c (the aftercare card) or
// /?aftercare=original (the first add-ons grid). The previews are dev-only
// and loaded on demand, so the archived versions never enter the production
// build.
const AftercareNote = import.meta.env.DEV ? lazy(() => import("@/design-archive/aftercare/AftercareNote")) : null;
const AftercareCard = import.meta.env.DEV ? lazy(() => import("@/design-archive/aftercare/AftercareCard")) : null;
const AddOns = import.meta.env.DEV ? lazy(() => import("@/design-archive/aftercare/AddOns")) : null;

const PREVIEWS = { note: AftercareNote, c: AftercareCard, original: AddOns };

export default function Aftercare() {
  const key = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("aftercare")?.toLowerCase()
    : null;

  const Preview = PREVIEWS[key];
  if (Preview) {
    return (
      <Suspense fallback={null}>
        <Preview />
      </Suspense>
    );
  }
  return <AftercareNewGame />;
}
