import { POSTS, ProfileImage } from "../editions/posts";
import { LAUNCH, PROFILE_ORDER } from "../editions/data";

// Renders one piece of artwork at its exact export size, unscaled, so a
// screenshot of #export is the final image:
//
//   export.html?post=01      a post, 1080 × 1350
//   export.html?profile      the profile image, 1080 × 1080
//   export.html?grid         the profile grid as Instagram crops it (3:4 tiles)
//   export.html?sheet        a contact sheet of all nine, uncropped, labelled
//
// concepts/export-posts.mjs screenshots every one of these.


// Instagram's profile grid shows a 4:5 post as a 3:4 tile: full height, 34px
// trimmed from each side (1012 of 1080 wide).
function Tile({ id, width }) {
  const Post = POSTS[id];
  const scale = width / 1012;
  return (
    <div className="x-tile" style={{ width, height: width * (4 / 3) }}>
      <div style={{ transform: `translateX(${-34 * scale}px) scale(${scale})`, transformOrigin: "0 0" }}>
        <Post />
      </div>
    </div>
  );
}

function Grid() {
  return (
    <div id="export" className="x-grid">
      {PROFILE_ORDER.map((id) => (
        <Tile key={id} id={id} width={360} />
      ))}
    </div>
  );
}

function Sheet() {
  return (
    <div id="export" className="x-sheet">
      <header>
        <p>Beyond Years Designs · Instagram launch set</p>
        <p>Nine posts · 1080 × 1350 · in posting order</p>
      </header>
      <div className="x-sheet-grid">
        {LAUNCH.map((p) => {
          const Post = POSTS[p.id];
          return (
            <figure key={p.id}>
              <div className="x-sheet-art">
                <div style={{ transform: "scale(0.4)", transformOrigin: "0 0" }}>
                  <Post />
                </div>
              </div>
              <figcaption>
                <b>{p.id}</b> {p.title}
                <span>{p.status}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

export default function ExportApp({ params }) {
  if (params.has("grid")) return <Grid />;
  if (params.has("sheet")) return <Sheet />;
  if (params.has("profile")) {
    return (
      <div id="export">
        <ProfileImage />
      </div>
    );
  }
  const id = params.get("post") ?? "01";
  const Post = POSTS[id];
  if (!Post) return <p>No post {id}. Use 01 to 09.</p>;
  return (
    <div id="export">
      <Post />
    </div>
  );
}

