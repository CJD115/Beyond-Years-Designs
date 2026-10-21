import { Fragment } from "react";
import Frame from "../Frame";
import { Credits, Door, Floor, Foot, Post, RunningHead, Shot, Spill } from "./system";
import { FLOOR, STATUS } from "./tokens";
import { HesperSite, OttolineSite } from "./sites";
import { NOTE, RESIDENTS, ROOM_I, ROOM_II, SECOND_LOOK, WORKING } from "./data";

// A coded site, cropped inside a door: `from` is the site x (of 1440) the
// door's left edge shows, `scale` how large the site is drawn.
function SiteCrop({ children, from = 680, scale = 0.672 }) {
  return (
    <div className="ed-sitecrop" style={{ left: -from * scale, width: 1440 * scale }}>
      <Frame width={1440} height={900}>
        {children}
      </Frame>
    </div>
  );
}

// ------------------------------------------------------------ 01 Front Door

export function FrontDoor() {
  return (
    <Post ground="paper">
      <RunningHead left="Beyond Years Designs — Bristol" right="No. 01" />
      <h2 className="ed-statement" style={{ left: 72, top: 160 }}>
        <span>Places people</span>
        <em>step into,</em>
        <span className="ed-statement-sm">not pages they scroll past.</span>
      </h2>
      <p className="ed-body" style={{ left: 80, top: 600, width: 540 }}>
        A two-person studio in Bristol. We design, build and write websites for independent businesses.
      </p>
      <div className="ed-index" style={{ left: 80, top: 860, width: 540 }}>
        <p className="ed-label">The rooms so far</p>
        <ol>
          <li><b>I</b> Churcham Homes <i>2025</i></li>
          <li><b>II</b> Groves Hairstyling <i>2024</i></li>
          <li><b>III</b> Hidden Gem <i>2024</i></li>
        </ol>
      </div>
      <p className="ed-door-caption" style={{ right: 80, top: FLOOR - 520 - 46, width: 440 }}>Room I, inside</p>
      <Door x={700} w={300} h={520} kind="opening">
        <Shot src={ROOM_I.phone} />
      </Door>
      <Floor />
      <Credits items={[["Design & build", "Connor"], ["Words", "Mike"], ["Based in", "Bristol"]]} />
      <Foot status={STATUS.studio()} />
    </Post>
  );
}

// ------------------------------------------------------------ 02 / 04 Rooms

function RoomPost({ room, line, mirrored }) {
  const door = mirrored ? { x: 590, w: 410 } : { x: 80, w: 410 };
  const col = mirrored ? 80 : 560;
  return (
    <Post ground="room">
      <RunningHead left="Beyond Years — Rooms" right={`Room ${room.numeral} of III`} />
      <h2 className="ed-name" style={{ left: 70, top: 132 }}>
        {room.first}
        <span>{room.rest}</span>
      </h2>
      <p className="ed-deck" style={{ left: 80, top: 352, width: 900 }}>{line}</p>
      <Spill x={door.x} w={door.w} />
      <Door x={door.x} w={door.w} h={630} kind="solid">
        <Shot src={room.phone} />
      </Door>
      <figure className="ed-plate" style={{ left: col, top: 480, width: 440 }}>
        <Shot src={room.desktop} />
        <figcaption>Plate — {mirrored ? "service menu, desktop" : "homepage, desktop"}</figcaption>
      </figure>
      <div className="ed-decisions" style={{ left: col, top: 806, width: 440 }}>
        <p className="ed-label">Decisions</p>
        <ol>
          {room.decisions.map((d, i) => (
            <li key={d}><b>0{i + 1}</b>{d}</li>
          ))}
        </ol>
      </div>
      <Floor />
      <Credits
        items={[
          ["Design & build", "Connor"],
          ["Words", "Mike"],
          ["Platform", room.platform],
          ["Lighthouse", `${room.lighthouse} at launch`],
        ]}
      />
      <Foot status={STATUS.commissioned(`${room.place} · ${room.year}`)} />
    </Post>
  );
}

export function RoomOne() {
  return <RoomPost room={ROOM_I} line="A family-run developer building premium homes across Gloucestershire." />;
}

export function RoomTwo() {
  return <RoomPost room={ROOM_II} line="A family-run salon that had only ever lived on social media." mirrored />;
}

// ------------------------------------------------------------ 03 Residents

export function Residents() {
  const doors = [110, 610];
  return (
    <Post ground="paper">
      <RunningHead left="Beyond Years — The residents" right="No. 03" />
      <h2 className="ed-statement" style={{ left: 72, top: 160 }}>
        <span>Two people,</span>
        <em>one studio.</em>
      </h2>
      {RESIDENTS.map((r, i) => (
        <Fragment key={r.name}>
          <div className="ed-who" style={{ left: doors[i], top: 488, width: 360 }}>
            <p className="ed-who-name">{r.name}</p>
            <p className="ed-who-role">{r.role}</p>
          </div>
          <Door x={doors[i]} w={360} h={500} kind="opening">
            <Shot src={r.image} position={r.focus} className="ed-portrait" />
          </Door>
          <p className="ed-quote" style={{ left: doors[i], top: 1136, width: 380 }}>“{r.line}”</p>
        </Fragment>
      ))}
      <Floor />
      <Foot status={STATUS.studio("Lines from our own bios")} />
    </Post>
  );
}

// ------------------------------------------------------------ 05 Words

export function Words() {
  return (
    <Post ground="paper">
      <RunningHead left="Beyond Years — Notes" right="No. 01 · Words" />
      <div className="ed-slip" style={{ left: 80, top: 152, width: 920 }}>
        <p className="ed-label">Before</p>
        <p className="ed-before">{NOTE.before}</p>
      </div>
      <p className="ed-label" style={{ position: "absolute", left: 80, top: 452 }}>After</p>
      <p className="ed-after" style={{ left: 74, top: 494 }}>
        {NOTE.after.map((l) =>
          l.includes("honestly") ? (
            <span key={l}><em>honestly</em>{l.replace("honestly", "")}</span>
          ) : (
            <span key={l}>{l}</span>
          ),
        )}
      </p>
      <p className="ed-body ed-body-sm" style={{ left: 80, top: 1010, width: 900 }}>{NOTE.why}</p>
      <Floor />
      <Credits items={[["Words", "Mike"], ["Note", "01"], ["Example", "Invented"]]} />
      <Foot status={STATUS.illustrative()} />
    </Post>
  );
}

// ------------------------------------------------------------ 06 / 08 Studies

function StudyPost({ number, title, kind, notes, mirrored, site }) {
  const door = mirrored ? { x: 440, w: 560 } : { x: 80, w: 560 };
  const col = mirrored ? { left: 80, width: 320 } : { left: 690, width: 310 };
  return (
    <Post ground="room">
      <RunningHead left="Beyond Years — Studies" right={`Study ${number}`} />
      <p className="ed-spec" style={{ left: 80, top: 140 }}>Speculative study · {kind} · Not a client</p>
      <h2 className={`ed-study-title ${mirrored ? "" : "ed-right"}`} style={mirrored ? { left: 72, top: 214 } : { right: 80, top: 214 }}>
        <span>{title}</span>
        <em>imagined.</em>
      </h2>
      <Spill x={door.x} w={door.w} />
      <Door x={door.x} w={door.w} h={620} kind="dashed">
        <SiteCrop>{site}</SiteCrop>
      </Door>
      <div className="ed-decisions" style={{ ...col, top: 560 }}>
        <p className="ed-label">What it tests</p>
        <ul>
          {notes.map((n) => <li key={n}>{n}</li>)}
        </ul>
        <p className="ed-mono-note">Coded in React · 1440 × 900</p>
      </div>
      <Floor />
      <Credits
        items={[
          ["Kind", "Self-initiated"],
          ["Design & build", "Connor"],
          ["Words", "Mike"],
          ["Client", "None"],
        ]}
      />
      <Foot status={STATUS.speculative(kind)} speculative />
    </Post>
  );
}

export function StudyOne() {
  return (
    <StudyPost
      number="01"
      title="A salon,"
      kind="Fictional salon"
      site={<OttolineSite />}
      notes={[
        "A mirror where a stock photo would usually go.",
        "Prices that read at a glance.",
        "A chair one tap away on every screen.",
      ]}
    />
  );
}

export function StudyTwo() {
  return (
    <StudyPost
      number="02"
      title="A stay,"
      kind="Fictional stay"
      mirrored
      site={<HesperSite hour={16.6} />}
      notes={[
        "A homepage that follows the light at the hut, from first light to dusk.",
        "Dates and prices on the first screen.",
      ]}
    />
  );
}

// ------------------------------------------------------------ 07 Second Look

export function SecondLook() {
  return (
    <Post ground="paper">
      <RunningHead left="Beyond Years — Second Look" right="No. 07" />
      <h2 className="ed-statement ed-statement-xl" style={{ left: 68, top: 140 }}>
        <span>Second</span>
        <em>Look.</em>
      </h2>
      <p className="ed-body" style={{ left: 80, top: 596, width: 560 }}>
        A short, private walk through your website, recorded on a phone as your next customer would see it.
      </p>
      <ol className="ed-steps" style={{ left: 80, top: 790, width: 580 }}>
        {SECOND_LOOK.steps.map((s, i) => (
          <li key={s}><b>{["I", "II", "III", "IV"][i]}</b>{s}</li>
        ))}
      </ol>
      <p className="ed-door-caption" style={{ right: 80, top: FLOOR - 520 - 46, width: 440 }}>Example · fictional salon</p>
      <Door x={700} w={300} h={520} kind="opening">
        <div className="ed-rec">
          <span className="ed-rec-dot" />REC 02:48
        </div>
        <div className="ed-phone">
          <SiteCrop from={0} scale={0.26}>
            <OttolineSite />
          </SiteCrop>
        </div>
      </Door>
      <Floor />
      <p className="ed-ask" style={{ left: 80, top: 1146, width: 920 }}>
        Ask for one: send us a message, or email <b>{SECOND_LOOK.contact}</b>
      </p>
      <Foot status={STATUS.studio("Free, no obligation")} />
    </Post>
  );
}

// ------------------------------------------------------------ 09 Working with us

export function WorkingWithUs() {
  return (
    <Post ground="paper">
      <RunningHead left="Beyond Years — Working with us" right="No. 09" />
      <h2 className="ed-statement" style={{ left: 72, top: 160 }}>
        <span>Our door’s</span>
        <em>open.</em>
      </h2>
      <div className="ed-process" style={{ left: 80, top: 486, width: 600 }}>
        <p className="ed-label">How a project starts</p>
        <ol>
          {WORKING.steps.map(([t, d], i) => (
            <li key={t}>
              <b>0{i + 1}</b>
              <span>
                <strong>{t}</strong>
                {d}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <Spill x={760} w={240} />
      <Door x={760} w={240} h={460} kind="opening" className="ed-door-lit" />
      <Floor />
      <p className="ed-services" style={{ left: 80, top: 1140, width: 920 }}>{WORKING.services.join(" · ")}</p>
      <p className="ed-ask" style={{ left: 80, top: 1192, width: 920 }}>
        {WORKING.priceLine ? `${WORKING.priceLine} · ` : ""}Start with a free call · <b>beyondyears.co.uk</b>
      </p>
      <Foot status={STATUS.studio("Bristol")} />
    </Post>
  );
}

// ------------------------------------------------------------ profile image

// 1080 × 1080, read inside Instagram's circular crop: the doorway, lit.
export function ProfileImage() {
  return (
    <div className="ed-avatar">
      <svg viewBox="0 0 1080 1080" aria-hidden="true">
        <polygon points="390,770 690,770 860,1080 220,1080" fill="rgba(241,235,227,0.06)" />
        <polygon points="390,770 690,770 740,1080 340,1080" fill="rgba(241,235,227,0.06)" />
        <line x1="0" y1="770" x2="1080" y2="770" stroke="rgba(241,235,227,0.16)" strokeWidth="2" />
      </svg>
      <div className="ed-avatar-door">
        <div />
      </div>
    </div>
  );
}

// Concept tooling only (never in the site build), so fast refresh here doesn't matter
// eslint-disable-next-line react-refresh/only-export-components
export const POSTS = {
  "01": FrontDoor,
  "02": RoomOne,
  "03": Residents,
  "04": RoomTwo,
  "05": Words,
  "06": StudyOne,
  "07": SecondLook,
  "08": StudyTwo,
  "09": WorkingWithUs,
};
