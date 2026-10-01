import { lazy, Suspense } from "react";
import AftercareNote from "./aftercare/AftercareNote";

// Aftercare ("Beyond launch"), shown straight after Process.
// The site uses the handover note. Earlier versions live in
// src/design-archive/aftercare — preview them on the dev server with
// /?aftercare=c (the aftercare card) or /?aftercare=original (the first
// add-ons grid). The previews are dev-only and loaded on demand, so the
// archived versions never enter the production build.
const AftercareCard = import.meta.env.DEV ? lazy(() => import("@/design-archive/aftercare/AftercareCard")) : null;
const AddOns = import.meta.env.DEV ? lazy(() => import("@/design-archive/aftercare/AddOns")) : null;

export default function Aftercare() {
  const key = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("aftercare")?.toLowerCase()
    : null;

  const Preview = key === "c" ? AftercareCard : key === "original" ? AddOns : null;
  if (Preview) {
    return (
      <Suspense fallback={null}>
        <Preview />
      </Suspense>
    );
  }
  return <AftercareNote />;
}
