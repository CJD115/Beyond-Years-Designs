import VisionAnnotated from "./vision/VisionAnnotated";
import VisionOriginal from "./vision/VisionOriginal";
import VisionReadSlowly from "./vision/VisionReadSlowly";

// Our Vision.
// The site uses "Annotated" (the marked-up proof with margin notes). The other
// versions are kept as components — preview them with /?vision=original or
// /?vision=read, or render one here to switch.
export default function StatementSection() {
  const key =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("vision")?.toLowerCase()
      : null;

  if (key === "original") return <VisionOriginal />;
  if (key === "read") return <VisionReadSlowly />;
  return <VisionAnnotated />;
}
