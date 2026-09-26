import WorkRooms from "./work/WorkRooms";
import WorkClassic from "./work/WorkClassic";

// Selected Work.
// The site uses "Rooms". The original layout is kept as WorkClassic — preview
// it with /?work=classic, or render <WorkClassic /> here to switch back.
export default function Work() {
  const classic =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("work") === "classic";

  return classic ? <WorkClassic /> : <WorkRooms />;
}
