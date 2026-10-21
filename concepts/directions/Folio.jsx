import Frame from "../Frame";
import { NOTE, RESIDENTS, ROOMS, STUDIO, STUDY } from "../content";

// Direction I — Folio. The feed as a printed studio monograph: running heads,
// numbered plates that bleed off the page, credits like the back of a book.

function Head({ left, right }) {
  return (
    <header className="fo-head">
      <span>{left}</span>
      <span>{right}</span>
    </header>
  );
}

export function Statement() {
  return (
    <div className="fo fo-paper">
      <Head left="Beyond Years Designs — Bristol" right="Issue 01" />
      <h2 className="fo-statement">
        <span>{STUDIO.line[0]}</span>
        <em>{STUDIO.line[1]}</em>
        <span className="fo-statement-small">{STUDIO.line[2]}</span>
        <span className="fo-statement-small">{STUDIO.line[3]}</span>
      </h2>
      <aside className="fo-index">
        <p className="fo-sc">Rooms</p>
        <ol>
          <li><b>I</b> Churcham Homes <i>2025</i></li>
          <li><b>II</b> Groves Hairstyling <i>2024</i></li>
          <li><b>III</b> Hidden Gem <i>2024</i></li>
        </ol>
        <p className="fo-sc fo-index-gap">The studio</p>
        <p className="fo-index-copy">Design, build &amp; words for independent businesses.</p>
      </aside>
      <footer className="fo-folio">p. 01</footer>
    </div>
  );
}

export function Room({ room = ROOMS[0] }) {
  return (
    <div className="fo fo-paper">
      <Head left="Beyond Years — Rooms" right={`${room.numeral} / III`} />
      <span className="fo-numeral" aria-hidden="true">{room.numeral}</span>
      <figure className="fo-plate-bleed">
        <img src={room.desktop} alt="" />
        <figcaption>Plate 1 — Homepage, desktop</figcaption>
      </figure>
      <figure className="fo-plate-phone">
        <img src={room.phone} alt="" />
      </figure>
      <div className="fo-room-title">
        <h2>{room.nameLines[0]}<br />{room.nameLines[1]}</h2>
        <p className="fo-meta">{room.industry} · {room.location} · {room.year}</p>
        <p className="fo-room-line">{room.line}</p>
      </div>
      <dl className="fo-credits">
        <div><dt>Design &amp; build</dt><dd>Connor</dd></div>
        <div><dt>Words</dt><dd>Mike</dd></div>
        <div><dt>Built on</dt><dd>{room.platform}</dd></div>
        <div><dt>Status</dt><dd>Commissioned</dd></div>
      </dl>
    </div>
  );
}

export function Words() {
  return (
    <div className="fo fo-paper">
      <Head left="Beyond Years — Notes" right={`No. ${NOTE.number} · ${NOTE.label}`} />
      <p className="fo-sc fo-words-label">Before</p>
      <p className="fo-before">{NOTE.before}</p>
      <hr className="fo-rule" />
      <p className="fo-sc fo-words-label fo-after-label">After</p>
      <p className="fo-after">
        {NOTE.after.map((l, i) => (
          <span key={l}>{i === 3 ? <><em className="fo-ochre">honestly</em>{l.replace("honestly", "")}</> : l}</span>
        ))}
      </p>
      <p className="fo-margin-note">{NOTE.why}</p>
      <footer className="fo-foot-note">
        <span>{NOTE.example}</span>
        <span>Words — Beyond Years</span>
      </footer>
    </div>
  );
}

export function Study() {
  return (
    <div className="fo fo-stone">
      <Head left="Beyond Years — Studies" right={`No. ${STUDY.number}`} />
      <p className="fo-spec-tag">{STUDY.label}</p>
      <figure className="fo-plate-study">
        <Frame width={1440} height={900}>
          <SalonSite />
        </Frame>
      </figure>
      <h2 className="fo-study-title">
        {STUDY.name},<br /><em>imagined.</em>
      </h2>
      <div className="fo-study-notes">
        <p className="fo-sc">What it tests</p>
        <p>The price list set like a printed menu. A chair one tap away on every screen.</p>
      </div>
      <footer className="fo-folio">Self-initiated. Not a commission.</footer>
    </div>
  );
}

export function Residents() {
  return (
    <div className="fo fo-paper">
      <Head left="Beyond Years — The residents" right="Two people" />
      {RESIDENTS.map((r, i) => (
        <figure key={r.name} className={`fo-resident fo-resident-${i}`}>
          <img src={r.image} alt="" />
          <figcaption>
            <span className="fo-sc">{r.name} — {r.role}</span>
            <q>{r.quote}</q>
          </figcaption>
        </figure>
      ))}
      <footer className="fo-folio">p. 03</footer>
    </div>
  );
}

// The fictional salon, as the Folio studio would design it: editorial,
// type-led, the price list printed like a restaurant menu.
export function SalonSite() {
  return (
    <div className="ot-fo">
      <nav className="ot-fo-nav">
        <span className="ot-fo-logo">{STUDY.name}</span>
        <span className="ot-fo-links">Cuts · Colour · The room · Stylists</span>
        <span className="ot-fo-book">Book a chair →</span>
      </nav>
      <h1 className="ot-fo-hero">
        {STUDY.hero.map((l) => <span key={l}>{l}</span>)}
      </h1>
      <p className="ot-fo-sub">A small, colour-led salon. Honest consultations and unhurried appointments.</p>
      <div className="ot-fo-ctas">
        <span className="ot-fo-btn">Book a chair</span>
        <span className="ot-fo-link">See the menu</span>
      </div>
      <p className="ot-fo-hours">Open Tuesday to Saturday · Late on Thursdays</p>
      <aside className="ot-fo-menu">
        <p className="ot-fo-menu-title">The menu</p>
        <ul>
          {STUDY.menu.map(([s, p]) => (
            <li key={s}><span>{s}</span><i /><span>{p}</span></li>
          ))}
        </ul>
        <p className="ot-fo-menu-foot">Prices are a guide. Your stylist confirms them at your consultation.</p>
        <p className="ot-fo-stylists">With {STUDY.stylists.join(", ")}</p>
      </aside>
    </div>
  );
}
