import { useState } from "react";
import Frame from "./Frame";
import { DIRECTIONS } from "./directions/meta";
import { ROOMS } from "./content";
import LaunchSet from "./LaunchSet";
import "./editions/editions.css";

const POSTS = [
  { key: "statement", title: "The front door", note: "Studio statement · pinned", render: (P) => <P.Statement /> },
  { key: "room", title: "Room I — Churcham Homes", note: "Commissioned · real screenshots", render: (P) => <P.Room room={ROOMS[0]} /> },
  { key: "words", title: "A line, rewritten", note: "Copywriting · illustrative example", render: (P) => <P.Words /> },
  { key: "study", title: "Study 01 — Ottoline", note: "Speculative · fictional salon", render: (P) => <P.Study /> },
  { key: "room2", title: "Room II — Groves Hairstyling", note: "Same template, another project", render: (P) => <P.Room room={ROOMS[1]} /> },
  { key: "residents", title: "The residents", note: "Connor & Mike", render: (P) => <P.Residents /> },
];

// Order on the profile grid: newest first, top left
const GRID = ["statement", "room", "words", "room2", "study", "residents"];

const REC = {
  id: "editions",
  headline: "Editions: Threshold’s doorway, Folio’s structure.",
};

export default function Gallery() {
  const [mode, setMode] = useState("launch");

  return (
    <div className="g">
      <header className="g-top">
        <div className="g-top-inner">
          <p className="g-kicker">Beyond Years Designs · Instagram art direction · Study set 01</p>
          <h1 className="g-title">Four ways into <em>the same rooms.</em></h1>
          <p className="g-lede">
            The chosen direction, IV Editions, is built out as a nine-post launch set. Directions I–III stay here for
            reference. Every direction uses the site’s own fonts and colours, verified in <code>src/index.css</code>.
            Real client work is marked{" "}
            <span className="g-badge g-badge-real">Commissioned</span>. The salon is fictional and marked{" "}
            <span className="g-badge g-badge-spec">Speculative</span>.
          </p>
          <div className="g-toggle" role="tablist" aria-label="View">
            <button role="tab" aria-selected={mode === "launch"} onClick={() => setMode("launch")}>Launch set</button>
            <button role="tab" aria-selected={mode === "directions"} onClick={() => setMode("directions")}>By direction</button>
            <button role="tab" aria-selected={mode === "compare"} onClick={() => setMode("compare")}>Side by side</button>
          </div>
          <nav className="g-jump" aria-label="Directions">
            {DIRECTIONS.map((d) => (
              <a key={d.id} href={`#${d.id}`} onClick={() => setMode("directions")}>
                <b>{d.numeral}</b> {d.name}
              </a>
            ))}
            <a href="#recommendation">Recommendation</a>
          </nav>
        </div>
      </header>

      {mode === "launch" && <LaunchSet />}
      {mode === "directions" && DIRECTIONS.map((d) => <Direction key={d.id} d={d} />)}
      {mode === "compare" && <Compare />}

      <Recommendation />
    </div>
  );
}

function Direction({ d }) {
  const P = d.parts;
  return (
    <section id={d.id} className={`g-dir g-dir-${d.id}`}>
      <div className="g-dir-head">
        <p className="g-dir-num">{d.numeral}</p>
        <div>
          <h2 className="g-dir-name">{d.name}</h2>
          <p className="g-dir-kind">{d.kind}</p>
        </div>
        <p className="g-dir-rationale">{d.rationale}</p>
      </div>

      <div className="g-posts">
        {POSTS.slice(0, 3).map((p) => (
          <Post key={p.key} p={p} P={P} d={d} />
        ))}
      </div>

      <System d={d} />

      <div className="g-posts">
        {POSTS.slice(3).map((p) => (
          <Post key={p.key} p={p} P={P} d={d} />
        ))}
      </div>

      <div className="g-site">
        <div className="g-site-label">
          <span className="g-badge g-badge-spec">Speculative</span>
          <span>Ottoline is a fictional salon. Homepage concept, designed the way {d.name} would design it · 1440 × 900</span>
        </div>
        <Frame width={1440} height={900} className="g-site-frame" label={`Speculative salon homepage in the ${d.name} direction`}>
          <P.SalonSite />
        </Frame>
      </div>

      <div className="g-grid-wrap">
        <div className="g-grid-copy">
          <h3>On the profile grid</h3>
          <p>
            What a prospect sees when they open the profile after an outreach email: six posts, cropped to the grid’s
            3:4 tiles (Instagram trims a sliver from each side of a 4:5 post). Check this on a phone before posting.
          </p>
        </div>
        <div className="g-grid" aria-label={`${d.name} profile grid preview`}>
          {GRID.map((k) => {
            const p = POSTS.find((x) => x.key === k);
            return (
              <Frame key={k} crop="grid" className="g-grid-tile">
                {p.render(P)}
              </Frame>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Post({ p, P, d }) {
  const spec = p.key === "study";
  return (
    <figure className="g-post">
      <Frame label={`${p.title}, ${d.name} direction`}>{p.render(P)}</Frame>
      <figcaption>
        <span className={`g-badge ${spec || p.key === "words" ? "g-badge-spec" : p.key.startsWith("room") ? "g-badge-real" : "g-badge-studio"}`}>
          {spec ? "Speculative" : p.key === "words" ? "Illustrative" : p.key.startsWith("room") ? "Commissioned" : "Studio"}
        </span>
        <b>{p.title}</b>
        <span>{p.note}</span>
      </figcaption>
    </figure>
  );
}

function System({ d }) {
  return (
    <div className="g-system">
      <div className="g-system-col">
        <h3>Colour</h3>
        <ul className="g-colours">
          {d.colours.map((c) => (
            <li key={c.hex}>
              <span style={{ background: c.hex }} />
              <b>{c.name}</b>
              <i>{c.hex} · {c.token}</i>
            </li>
          ))}
        </ul>
      </div>
      <div className="g-system-col">
        <h3>Type</h3>
        <ul className="g-type">
          {d.type.map((t) => (
            <li key={t.family}>
              <span className={`g-spec g-spec-${t.family.split(" ")[0].toLowerCase()}${t.family.includes("SC") ? "-sc" : ""}`}>
                {t.family}
              </span>
              <i>{t.use}</i>
            </li>
          ))}
        </ul>
      </div>
      <div className="g-system-col g-system-rules">
        <h3>As a repeatable system</h3>
        <ol>
          {d.system.map((s) => <li key={s}>{s}</li>)}
        </ol>
        <p><b>Effort.</b> {d.effort}</p>
        <p><b>Risk.</b> {d.risk}</p>
      </div>
    </div>
  );
}

function Compare() {
  return (
    <section className="g-compare" aria-label="Side-by-side comparison">
      <div className="g-compare-head" style={{ "--cols": DIRECTIONS.length }}>
        <span />
        {DIRECTIONS.map((d) => (
          <p key={d.id}><b>{d.numeral}</b> {d.name} <i>{d.kind}</i></p>
        ))}
      </div>
      {POSTS.map((p) => (
        <div key={p.key} className="g-compare-row" style={{ "--cols": DIRECTIONS.length }}>
          <p className="g-compare-label"><b>{p.title}</b><span>{p.note}</span></p>
          {DIRECTIONS.map((d) => (
            <Frame key={d.id} label={`${p.title}, ${d.name}`}>{p.render(d.parts)}</Frame>
          ))}
        </div>
      ))}
      <div className="g-compare-row g-compare-sites" style={{ "--cols": DIRECTIONS.length }}>
        <p className="g-compare-label"><b>Ottoline homepage</b><span>Speculative · fictional salon</span></p>
        {DIRECTIONS.map((d) => (
          <Frame key={d.id} width={1440} height={900} label={`Speculative salon homepage, ${d.name}`}>
            <d.parts.SalonSite />
          </Frame>
        ))}
      </div>
    </section>
  );
}

function Recommendation() {
  const d = DIRECTIONS.find((x) => x.id === REC.id);
  return (
    <section id="recommendation" className="g-rec">
      <p className="g-kicker">Recommendation</p>
      <h2 className="g-rec-title"><b>{d.numeral}</b> {REC.headline}</h2>
      <div className="g-rec-body">
        <p>
          Threshold was the only direction that couldn’t belong to another studio, because the doorway, the light on the
          floor and the rooms already exist on beyondyears.co.uk. On its own, though, it was dark and loud. Folio was
          calm and legible, but not ownable.
        </p>
        <p>
          Editions keeps one from each. The doorway appears only where there is work to show, and the editorial system
          carries everything else: running heads, a floor line at the same height on every post, credits, and an
          honesty status in the foot. Paper and room alternate, so the grid reads as a publication rather than a mood
          board.
        </p>
        <p>
          Honesty is built into the drawing, not added as a disclaimer: solid door for commissioned work, dashed door
          and a labelled status for speculative studies, a ruled slip for invented copy.
        </p>
      </div>
    </section>
  );
}
