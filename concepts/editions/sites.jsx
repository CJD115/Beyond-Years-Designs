import { hourLabel, skyAt } from "./sky";

// Two coded speculative websites, drawn at 1440 × 900. Both businesses are
// FICTIONAL and say so in their own footers as well as on every post.

const SALON_MENU = [
  ["Cut & finish", "from £58"],
  ["Full colour", "from £95"],
  ["Balayage", "from £165"],
  ["Colour consultation", "free"],
];

export function OttolineSite() {
  return (
    <div className="ot">
      <nav className="ot-nav">
        <span className="ot-logo">Ottoline</span>
        <span className="ot-links">
          <span>Cuts</span>
          <span>Colour</span>
          <span>The menu</span>
          <span>Stylists</span>
        </span>
        <span className="ot-book">Book a chair</span>
      </nav>

      <div className="ot-copy">
        <p className="ot-kicker">Hair &amp; colour · Tuesday to Saturday</p>
        <h1 className="ot-h1">
          Hair that looks
          <br />
          like <em>you</em> on your
          <br />
          best morning.
        </h1>
        <p className="ot-sub">A small, colour-led salon. Honest consultations, unhurried appointments, and a seat by the window if you want one.</p>
        <div className="ot-ctas">
          <span className="ot-btn">Book a chair</span>
          <span className="ot-link">See the menu</span>
        </div>
      </div>

      <div className="ot-mirror" aria-hidden="true">
        <div className="ot-glass">
          <span>you</span>
        </div>
      </div>

      <ul className="ot-menu">
        {SALON_MENU.map(([s, p]) => (
          <li key={s}>
            <span>{s}</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <p className="ot-disclaimer">A speculative study by Beyond Years. Ottoline is fictional.</p>
    </div>
  );
}

export function HesperSite({ hour = 16.6 }) {
  const s = skyAt(hour);
  const stars = s.dark && (hour >= 18 || hour < 6);
  return (
    <div
      className={`hs ${s.dark ? "hs-dark" : "hs-light"}`}
      style={{ background: `linear-gradient(to bottom, ${s.top} 0%, ${s.bottom} 74%)` }}
    >
      <svg className="hs-scene" viewBox="0 0 1440 900" aria-hidden="true">
        {stars &&
          [[180, 120], [260, 210], [520, 90], [700, 160], [860, 70], [1010, 140], [1240, 100], [1330, 200], [1120, 230], [400, 250]].map(
            ([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#f1ebe3" opacity="0.75" />,
          )}
        {/* the field and the hedge line */}
        <path d={`M0,690 C240,668 420,700 640,686 C860,672 1080,664 1440,684 L1440,900 L0,900 Z`} fill={s.land} />
        {/* window light falling on the grass */}
        <polygon points="1003,700 1069,700 1110,790 962,790" fill="#f0b46a" opacity={0.16 * s.glow} />
        {/* the hut */}
        <g fill={s.land}>
          <path d="M904,566 Q1060,468 1216,566 L1216,574 L904,574 Z" />
          <rect x="918" y="566" width="284" height="124" />
          <rect x="1148" y="486" width="14" height="52" />
          <rect x="900" y="688" width="320" height="8" />
          <circle cx="958" cy="712" r="24" />
          <circle cx="1166" cy="712" r="24" />
          <rect x="1106" y="696" width="44" height="6" />
          <rect x="1114" y="708" width="44" height="6" />
        </g>
        <rect x="992" y="596" width="84" height="54" rx="2" fill="#f4b96d" opacity={s.glow} />
        <rect x="992" y="596" width="84" height="54" rx="2" fill="#f4b96d" opacity={0.35 * s.glow} filter="url(#hs-blur)" />
        <rect x="1112" y="590" width="34" height="98" fill="#f4b96d" opacity={0.55 * s.glow} />
        <defs>
          <filter id="hs-blur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
      </svg>

      <nav className="hs-nav">
        <span className="hs-logo">Hesper</span>
        <span className="hs-links">
          <span>The hut</span>
          <span>The field</span>
          <span>Getting here</span>
        </span>
        <span className="hs-book">Check dates</span>
      </nav>

      <div className="hs-copy">
        <p className="hs-kicker">A shepherd’s hut for two · {hourLabel(hour)} at the hut</p>
        <h1 className="hs-h1">
          Stay until
          <br />
          <em>the light goes.</em>
        </h1>
        <p className="hs-sub">A wood stove, an outdoor bath and a field with nothing in it. No Wi-Fi, on purpose.</p>
      </div>

      <div className="hs-strip">
        <div>
          <span>Arrive</span>
          <b>Fri 6 Nov</b>
        </div>
        <div>
          <span>Nights</span>
          <b>2</b>
        </div>
        <div>
          <span>From</span>
          <b>£145 a night</b>
        </div>
        <span className="hs-strip-btn">Check dates</span>
      </div>
      <p className="hs-disclaimer">A speculative study by Beyond Years. Hesper is fictional.</p>
    </div>
  );
}
