// The X-ray hero's annotations: what the lens shows on top of the blueprint
// copy of the hero, drawn as the PDF draws them. Everything comes from
// measure.js, so the specs are the real ones: the eyebrow, headline and
// paragraph boxes and their type specs, the headline's cap height, x-height
// and baselines, the gap to the paragraph, and the links' 44px hit areas.

import { WEIGHTS, num } from "@/design-archive/hero/measure";

export default function Blueprint({ measures: m }) {
  if (!m) return null;

  // Offsets are the PDF's, in its pixels; on desktop they scale with the frame
  const s = (v) => v * m.unit;
  const { eyebrow, title, body, ctas } = m;
  const [first] = title.lines;

  // The eyebrow's box and spec
  const eyebrowBox = {
    left: eyebrow.text.left - s(4),
    right: eyebrow.text.right + s(4.6),
    top: eyebrow.box.top + s(1),
    bottom: eyebrow.box.bottom + s(1),
  };
  const eyebrowSpecBeside = eyebrowBox.right + s(10) + 200 < m.width;

  // The headline's box: the element, from just left of the text to just past
  // its longest line (short of the margin on phones)
  const titleBox = {
    left: title.box.left - s(4),
    right: Math.min(Math.max(...title.lines.map((l) => l.right)) + s(15), m.contentRight - 15),
    top: title.box.top,
    bottom: title.box.bottom + s(1),
  };

  // Line labels sit just right of the first line; a later line gets one only
  // if it ends short of them
  const labelX = first.right + s(24);
  const labelsFit = labelX + 60 < m.width;

  // The paragraph's box, with its spec underneath
  const bodyBox = {
    left: body.text.left - s(4),
    right: body.text.right + s(4),
    top: body.box.top - s(2),
    bottom: body.box.bottom + s(2),
  };

  const gapX = m.contentRight - s(6);
  const lastCta = ctas[ctas.length - 1];

  return (
    <div className="xr-notes pointer-events-none absolute inset-0 z-20">
      <Dashed rect={eyebrowBox} />
      <Label
        left={eyebrowSpecBeside ? eyebrowBox.right + s(10) : eyebrowBox.left + 4}
        top={eyebrowSpecBeside ? (eyebrowBox.top + eyebrowBox.bottom) / 2 : eyebrowBox.top - 4}
        y={eyebrowSpecBeside ? "-50%" : "-100%"}
      >
        p.eyebrow — Inter {num(eyebrow.size, 1)} / {num(eyebrow.tracking, 2)}em
      </Label>

      {/* Cap height and x-height of the first line; every line's baseline */}
      <Rule top={first.baseline - title.cap * title.size} />
      <Rule top={first.baseline - title.xHeight * title.size} />
      {title.lines.map((line, i) => (
        <Rule key={i} top={line.baseline} strong />
      ))}
      {labelsFit && (
        <>
          <Label left={labelX} top={first.baseline - title.cap * title.size - 3} y="-100%">
            cap
          </Label>
          <Label left={labelX} top={first.baseline - title.xHeight * title.size - 3} y="-100%">
            x-height
          </Label>
          {title.lines
            .filter((line) => line.right + 12 < labelX)
            .map((line, i) => (
              <Label key={i} left={labelX} top={line.baseline + 3}>
                baseline
              </Label>
            ))}
        </>
      )}

      <Dashed rect={titleBox} />
      {m.lg ? (
        <Label left={titleBox.left} top={titleBox.top - s(8)} y="-100%" backed>
          h1.hero-title — Cormorant Garamond {WEIGHTS[title.weight] ?? title.weight} {num(title.size)} /{" "}
          {num(title.leading, 2)} — tracking {num(title.tracking, 2)}em
        </Label>
      ) : (
        <Label left={titleBox.left} top={titleBox.bottom + 2} backed>
          h1 — Cormorant {num(title.size)} / {num(title.leading, 2)}
        </Label>
      )}

      <Dashed rect={bodyBox} />
      <Label left={bodyBox.left} top={bodyBox.bottom + s(5)}>
        p.hero-body — Inter {num(body.size, 1)} / {num(body.leading, 2)} — max-width {num(body.measure, 1)}em
      </Label>

      {/* The gap from the headline to the paragraph (phones, as in the PDF) */}
      {!m.lg && <Gap x={gapX} from={titleBox.bottom} to={body.text.top} value={num(body.text.top - titleBox.bottom)} />}

      {/* The links' hit areas */}
      {ctas.map((cta, i) => (
        <Dashed
          key={i}
          rect={{ left: cta.text.left - s(18), right: cta.box.right + s(6), top: cta.box.top, bottom: cta.box.bottom + 1 }}
        />
      ))}
      <Label
        left={m.lg ? lastCta.box.right - s(256) : ctas[0].text.left}
        top={lastCta.box.bottom + s(18)}
        y="-50%"
      >
        min-height {Math.round(lastCta.box.bottom - lastCta.box.top)}px ✓ — WCAG 2.5.8
      </Label>
    </div>
  );
}

// A line right across the hero
function Rule({ top, strong = false }) {
  return <div className={`xr-rule ${strong ? "is-strong" : ""}`} style={{ top }} />;
}

function Dashed({ rect }) {
  return (
    <div
      className="xr-dashed"
      style={{ left: rect.left, top: rect.top, width: rect.right - rect.left, height: rect.bottom - rect.top }}
    />
  );
}

// A mono label. `y` shifts it up from `top` ("-100%" sits it on top, "-50%"
// centres it); `backed` gives it the board's colour behind it.
function Label({ left, top, y = "0", backed = false, children }) {
  return (
    <span className={`xr-label ${backed ? "is-backed" : ""}`} style={{ left, top, transform: `translateY(${y})` }}>
      {children}
    </span>
  );
}

// A vertical measurement: the line, and its value to the left
function Gap({ x, from, to, value }) {
  if (to - from < 10) return null;
  return (
    <div className="xr-gap" style={{ left: x, top: from, height: to - from }}>
      <span className="xr-gap-value">{value}</span>
    </div>
  );
}
