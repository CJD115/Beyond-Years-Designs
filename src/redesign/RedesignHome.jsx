import { useSeo } from "@/lib/seo";
import Process from "@/components/studio/process/ProcessThresholds";

// The redesign, section by section, at /preview on the dev server only
// (`npm run dev`). App.jsx loads it on demand and only in development, so
// nothing in src/redesign reaches the production build or the live site.
// Add each new section to the list below as it's built. (Process has since
// gone live; it's kept here so the preview still has something to show.)
export default function RedesignHome() {
  useSeo({
    title: "Redesign preview | Beyond Years Designs",
    description: "Work-in-progress sections for the Beyond Years Designs redesign.",
    noindex: true,
  });

  return (
    <main id="content" tabIndex={-1} className="min-h-screen bg-background text-foreground antialiased focus:outline-none">
      <Process />
    </main>
  );
}
