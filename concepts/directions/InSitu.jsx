import { useId } from "react";
import Frame from "../Frame";
import { NOTE, RESIDENTS, ROOMS, STUDIO, STUDY } from "../content";

// Direction III — In Situ. The website shown in its place: the client's real
// space blurred behind (as Selected Work does on the site), the site printed
// and laid on top, and the palette sampled from the live site beside it.
// Speculative work has no real place, so it sits on a material instead:
// procedural plaster, paint chips, never a generated photo.

function Swatches({ palette, note, className = "" }) {
  return (
    <div className={`is-swatches ${className}`}>
      <div className="is-chips">
        {palette.map((c) => (
          <div key={c.hex} className="is-chip">
            <span style={{ background: c.hex }} />
            <b>{c.name}</b>
            <i>{c.hex}</i>
          </div>
        ))}
      </div>
      <p className="is-swatch-note">{note}</p>
    </div>
  );
}

// Plaster, drawn with an SVG noise filter: a real material, not an image
function Plaster({ tint = "#E9DFD3" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className="is-plaster" aria-hidden="true">
      <filter id={`p${id}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.011" numOctaves="5" seed="7" />
        <feColorMatrix values="0 0 0 0 0.6  0 0 0 0 0.53  0 0 0 0 0.47  1.5 0 0 0 -0.62" />
      </filter>
      <rect width="100%" height="100%" fill={tint} />
      <rect width="100%" height="100%" filter={`url(#p${id})`} opacity="0.55" />
    </svg>
  );
}

export function Statement() {
  return (
    <div className="is is-paper">
      <h2 className="is-statement">
        {STUDIO.line[0]}<br /><em>{STUDIO.line[1]}</em><br />
        <span>{STUDIO.line[2]} {STUDIO.line[3]}</span>
      </h2>
      <figure className="is-print is-print-a">
        <img src={ROOMS[0].desktop} alt="" />
        <figcaption>I — Churcham Homes</figcaption>
      </figure>
      <figure className="is-print is-print-b">
        <img src={ROOMS[1].phone} alt="" />
        <figcaption>II — Groves Hairstyling</figcaption>
      </figure>
      <p className="is-card is-card-statement">
        <b>{STUDIO.name}</b>
        Design, build &amp; words for independent businesses. {STUDIO.city}.
      </p>
    </div>
  );
}

export function Room({ room = ROOMS[0] }) {
  const place = room.id === "groves" ? "/work/groves-salon-400.webp" : room.place;
  return (
    <div className="is is-room">
      <img className="is-place" src={place} alt="" />
      <figure className="is-print is-print-desktop">
        <img src={room.desktop} alt="" />
      </figure>
      <figure className="is-print is-print-phone">
        <img src={room.phone} alt="" />
      </figure>
      <div className="is-card is-card-room">
        <p className="is-label">Room {room.numeral} · Commissioned · {room.year}</p>
        <h2>{room.name}</h2>
        <p className="is-room-meta">{room.industry} · {room.location} · {room.platform}</p>
        <p className="is-room-line">{room.line}</p>
        <p className="is-room-credit">Design &amp; build Connor · Words Mike</p>
      </div>
      <Swatches palette={room.palette} note="Sampled from the live site" className="is-swatches-room" />
    </div>
  );
}

export function Words() {
  return (
    <div className="is is-paper">
      <p className="is-label is-tl">Proof {NOTE.number} — {NOTE.label}</p>
      <div className="is-slip">
        <span className="is-crop is-crop-tl" /><span className="is-crop is-crop-br" />
        <p className="is-label">Before</p>
        <p className="is-slip-before">{NOTE.before}</p>
        <span className="is-pencil" />
      </div>
      <div className="is-proof">
        <span className="is-crop is-crop-tl" /><span className="is-crop is-crop-br" />
        <p className="is-label">After</p>
        <p className="is-proof-after">{NOTE.afterFlat}</p>
        <p className="is-proof-why">{NOTE.why}</p>
      </div>
      <p className="is-label is-bl">{NOTE.example}</p>
    </div>
  );
}

export function Study() {
  return (
    <div className="is is-material">
      <Plaster />
      <p className="is-stamp">Speculative study<br />Fictional salon · Not a client</p>
      <figure className="is-print is-print-study">
        <Frame width={1440} height={900}>
          <SalonSite />
        </Frame>
      </figure>
      <div className="is-paintchips">
        {STUDY.palette.map((c, i) => (
          <div key={c.hex} className="is-paintchip" style={{ "--chip": c.hex, "--i": i }}>
            <span />
            <b>{c.name}</b>
            <i>{c.hex}</i>
          </div>
        ))}
      </div>
      <div className="is-card is-card-study">
        <p className="is-label">Study {STUDY.number}</p>
        <h2>{STUDY.name}, <em>imagined</em></h2>
        <p className="is-room-meta">The salon’s materials first: plaster, terracotta, brass. The website second.</p>
      </div>
    </div>
  );
}

export function Residents() {
  return (
    <div className="is is-paper">
      <p className="is-label is-tl">The residents</p>
      {RESIDENTS.map((r, i) => (
        <figure key={r.name} className={`is-print is-print-person is-person-${i}`}>
          <img src={r.image} alt="" />
          <figcaption>{r.name} — {r.role}</figcaption>
        </figure>
      ))}
      <p className="is-card is-card-quote">
        <q>{RESIDENTS[0].quote}</q>
        <b>Connor</b>
        <q>{RESIDENTS[1].quote}</q>
        <b>Mike</b>
      </p>
    </div>
  );
}

// The fictional salon as In Situ would design it: material-led, every
// service a paint chip from the salon's own palette.
export function SalonSite() {
  const chips = ["#B5654A", "#5B2E2A", "#C2A16B", "#1E1A17"];
  return (
    <div className="ot-is">
      <Plaster />
      <nav className="ot-is-nav">
        <span className="ot-is-logo">{STUDY.name}</span>
        <span className="ot-is-links">Cuts · Colour · The room · Stylists</span>
        <span className="ot-is-book">Book a chair</span>
      </nav>
      <h1 className="ot-is-hero">{STUDY.heroFlat}</h1>
      <p className="ot-is-sub">Colour-led and unhurried. Bring the photo you’ve been saving.</p>
      <span className="ot-is-btn">Book a chair</span>
      <div className="ot-is-chips">
        {STUDY.menu.map(([s, p], i) => (
          <div key={s} className="ot-is-chip" style={{ "--chip": chips[i] }}>
            <span />
            <b>{s}</b>
            <i>{p}</i>
          </div>
        ))}
      </div>
    </div>
  );
}
