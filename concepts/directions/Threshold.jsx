import Frame from "../Frame";
import { NOTE, RESIDENTS, ROOMS, STUDY } from "../content";

// Direction II — Threshold. Every post is a room seen through the site's
// doorway: an ochre frame open at the floor, light spilling across it.
// Type is oversized and cut by the door and the canvas edge; JetBrains Mono
// annotates like an architect's drawing. Commissioned work stands behind a
// solid door; speculative work behind a dashed, unbuilt one.

// Light falling out of the door across the floor (the site's own shapes)
function Spill({ x, w, floor = 1110 }) {
  const spread = w * 0.45;
  return (
    <svg className="thr-spill" viewBox="0 0 1080 1350" aria-hidden="true">
      <polygon points={`${x},${floor} ${x + w},${floor} ${x + w + spread},1350 ${x - spread},1350`} />
      <polygon points={`${x},${floor} ${x + w},${floor} ${x + w + spread * 0.4},1350 ${x - spread * 0.4},1350`} />
    </svg>
  );
}

function Door({ style, dashed, children }) {
  return (
    <div className={`thr-door ${dashed ? "thr-door-dashed" : ""}`} style={style}>
      <div className="thr-door-room">{children}</div>
    </div>
  );
}

export function Statement() {
  return (
    <div className="thr thr-dark">
      <p className="thr-mono thr-tl">BEYOND YEARS DESIGNS</p>
      <p className="thr-mono thr-tr">BRISTOL — ISSUE 01</p>
      <h2 className="thr-statement">
        <span className="s1">Places</span>
        <span className="s2">people</span>
        <em className="s3">step into,</em>
        <span className="s4">not pages they scroll past.</span>
      </h2>
      <div className="thr-floor" />
      <Spill x={820} w={150} />
      <Door style={{ left: 820, top: 870, width: 150, height: 240 }}>
        <img src={ROOMS[0].phone} alt="" />
      </Door>
      <p className="thr-mono thr-step">STEP INSIDE ↓</p>
    </div>
  );
}

export function Room({ room = ROOMS[0] }) {
  return (
    <div className="thr thr-dark">
      <p className="thr-mono thr-tl">ROOM {room.numeral}<br />{room.name.toUpperCase()}</p>
      <p className="thr-mono thr-tr">COMMISSIONED<br />{room.year}</p>
      <h2 className="thr-room-word" aria-label={room.name}>
        <span>{room.nameLines[0]}</span>
      </h2>
      <div className="thr-floor" />
      <Spill x={96} w={470} />
      <Door style={{ left: 96, top: 300, width: 470, height: 810 }}>
        <img src={room.phone} alt="" className="thr-cover" />
      </Door>
      {/* the detail, cropped hard: a second, smaller room */}
      <Door style={{ left: 690, top: 690, width: 300, height: 420 }}>
        <img src={room.detail} alt="" className="thr-detail" />
      </Door>
      <div className="thr-dim thr-dim-h" style={{ left: 96, top: 1150, width: 470 }}>
        <span>470</span>
      </div>
      <div className="thr-dim thr-dim-v" style={{ left: 600, top: 300, height: 810 }}>
        <span>810</span>
      </div>
      <p className="thr-mono thr-vertical">{room.industry.toUpperCase()} — {room.location.toUpperCase()}</p>
      <dl className="thr-credits">
        <div><dt>DESIGN + BUILD</dt><dd>CONNOR</dd></div>
        <div><dt>WORDS</dt><dd>MIKE</dd></div>
        <div><dt>PLATFORM</dt><dd>{room.platform.toUpperCase()}</dd></div>
        <div><dt>LIGHTHOUSE</dt><dd>{room.lighthouse} AT LAUNCH</dd></div>
      </dl>
    </div>
  );
}

export function Words() {
  return (
    <div className="thr thr-light">
      <div className="thr-slab" />
      <p className="thr-mono thr-tl thr-ink">NOTE {NOTE.number} — {NOTE.label.toUpperCase()}</p>
      <p className="thr-before">
        <span className="thr-mono">BEFORE</span>
        <s>{NOTE.before}</s>
      </p>
      <p className="thr-after">
        {NOTE.after.map((l) => <span key={l}>{l}</span>)}
      </p>
      <p className="thr-mono thr-slab-label">AFTER</p>
      <p className="thr-why">{NOTE.why}</p>
      <p className="thr-mono thr-bl thr-ink">{NOTE.example.toUpperCase()}</p>
    </div>
  );
}

export function Study() {
  return (
    <div className="thr thr-dark">
      <p className="thr-mono thr-spec-vertical">SPECULATIVE STUDY · FICTIONAL SALON · NOT A CLIENT</p>
      <p className="thr-mono thr-tr">STUDY {STUDY.number}<br />UNBUILT</p>
      <h2 className="thr-study-word">{STUDY.name}</h2>
      <div className="thr-floor" />
      <Spill x={150} w={620} />
      <Door dashed style={{ left: 150, top: 330, width: 620, height: 780 }}>
        <div className="thr-site-crop">
          <Frame width={1440} height={900}>
            <SalonSite />
          </Frame>
        </div>
      </Door>
      <div className="thr-dim thr-dim-h" style={{ left: 150, top: 1150, width: 620 }}>
        <span>A MIRROR, NOT A HERO IMAGE</span>
      </div>
      <p className="thr-mono thr-bl">SELF-INITIATED · DESIGN + BUILD CONNOR · WORDS MIKE</p>
    </div>
  );
}

export function Residents() {
  return (
    <div className="thr thr-dark">
      <p className="thr-mono thr-tl">THE RESIDENTS</p>
      <p className="thr-mono thr-tr">TWO ROOMS<br />TWO PEOPLE</p>
      <div className="thr-floor" />
      {RESIDENTS.map((r, i) => (
        <div key={r.name}>
          <Spill x={i ? 600 : 120} w={360} />
          <Door style={{ left: i ? 600 : 120, top: i ? 360 : 300, width: 360, height: i ? 750 : 810 }}>
            <img src={r.image} alt="" className="thr-portrait" />
          </Door>
          <p className={`thr-mono thr-resident-name thr-resident-${i}`}>{r.name.toUpperCase()} — {r.role.toUpperCase()}</p>
        </div>
      ))}
      <p className="thr-resident-quote">One of us builds the room.<br />The other writes what’s said in it.</p>
    </div>
  );
}

// The fictional salon as Threshold would design it: walnut dark, an arched
// mirror where a stock hero photo would usually go.
export function SalonSite() {
  return (
    <div className="ot-thr">
      <nav className="ot-thr-nav">
        <span className="ot-thr-logo">{STUDY.name.toUpperCase()}</span>
        <span>CUTS</span><span>COLOUR</span><span>THE ROOM</span>
        <span className="ot-thr-book">BOOK A CHAIR →</span>
      </nav>
      <div className="ot-thr-mirror"><em>you</em></div>
      <h1 className="ot-thr-hero">
        <span>Hair that looks</span>
        <span>like <em>you</em> on your</span>
        <span>best morning.</span>
      </h1>
      <ul className="ot-thr-menu">
        {STUDY.menu.map(([s, p]) => (
          <li key={s}><span>{s.toUpperCase()}</span><span>{p.toUpperCase()}</span></li>
        ))}
      </ul>
    </div>
  );
}
