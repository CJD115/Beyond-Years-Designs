import { useState } from "react";
import Frame from "./Frame";
import { LAUNCH, PROFILE_ORDER, SCHEDULE } from "./editions/data";
import { POSTS, ProfileImage } from "./editions/posts";
import { HesperSite, OttolineSite } from "./editions/sites";
import { hourLabel } from "./editions/sky";

const STATUS_LABEL = {
  commissioned: ["Commissioned", "g-badge-real"],
  speculative: ["Speculative", "g-badge-spec"],
  illustrative: ["Illustrative", "g-badge-spec"],
  studio: ["Studio", "g-badge-studio"],
};

const byId = Object.fromEntries(LAUNCH.map((p) => [p.id, p]));

export default function LaunchSet() {
  return (
    <section className="ls" aria-labelledby="ls-title">
      <div className="ls-intro">
        <p className="g-kicker">IV · Editions · the launch set</p>
        <h2 id="ls-title" className="ls-title">Nine posts, <em>one studio.</em></h2>
        <p className="ls-lede">
          Every post below is final artwork at 1080 × 1350, built from the same templates and exported with{" "}
          <code>node concepts/export-posts.mjs</code>. Facts are checked against the project’s own records; anything that
          still needs a yes from Connor, Mike or a client is listed beside the post.
        </p>
      </div>

      <Profile />
      <Order />

      <div className="ls-posts">
        {LAUNCH.map((p) => (
          <PostRow key={p.id} p={p} />
        ))}
      </div>

      <Studies />
      <ExportNote />
    </section>
  );
}

function Profile() {
  return (
    <div className="ls-profile-wrap">
      <div className="ls-profile-copy">
        <h3>The profile, as a prospect sees it</h3>
        <p>
          The person you email clicks through to this. Three pinned posts answer who you are, what you’ve made and how
          to start; the six below alternate paper and room. Tiles are cropped to 3:4, as Instagram’s profile grid shows
          them.
        </p>
        <p className="ls-small">Check the pinned order on a phone after pinning: Instagram puts the most recently pinned post first.</p>
      </div>
      <div className="ls-phone">
        <div className="ls-phone-head">
          <div className="ls-avatar">
            <Frame width={1080} height={1080}>
              <ProfileImage />
            </Frame>
          </div>
          <div className="ls-stats">
            <p className="ls-handle">beyondyearsdesigns</p>
            <p className="ls-name">Beyond Years Designs</p>
          </div>
        </div>
        <p className="ls-bio">
          Websites as places, not pages.
          <br />
          Design, build &amp; words for independent businesses.
          <br />
          Bristol · Connor &amp; Mike
        </p>
        <p className="ls-link">beyondyears.co.uk</p>
        <div className="ls-highlights">
          {["Rooms", "Studies", "Second Look", "Start"].map((h) => (
            <div key={h} className="ls-highlight">
              <span />
              <b>{h}</b>
            </div>
          ))}
        </div>
        <div className="ls-grid">
          {PROFILE_ORDER.map((id, i) => {
            const Post = POSTS[id];
            return (
              <div key={id} className="ls-tile">
                <Frame crop="grid" label={`${id} ${byId[id].title}`}>
                  <Post />
                </Frame>
                {i < 3 && <span className="ls-pin">Pinned</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Order() {
  return (
    <div className="ls-order">
      <h3>Launch sequence</h3>
      <ol>
        <li><b>Mon 19 Oct</b> 01, 02 and 09 together, then pin them. The profile is never empty when someone visits.</li>
        <li><b>Wed 21 – Fri 23 Oct</b> 03 The Residents, then 04 Groves: the salon proof, early.</li>
        <li><b>Tue 27 – Thu 29 Oct</b> 05 Words (only once Mike has approved the line), then 06 Study 01.</li>
        <li><b>Mon 2 – Wed 4 Nov</b> 07 Second Look, then 08 Study 02.</li>
      </ol>
      <p className="ls-small">
        Post 03 to 08 in number order: that is what produces the alternating grid. If one slips, hold the ones after it
        rather than posting out of order.
      </p>
    </div>
  );
}

function PostRow({ p }) {
  const Post = POSTS[p.id];
  const [label, cls] = STATUS_LABEL[p.status];
  return (
    <article className="ls-post">
      <div className="ls-post-art">
        <Frame label={`${p.id} ${p.title}`}>
          <Post />
        </Frame>
      </div>
      <div className="ls-post-info">
        <p className="ls-post-num">{p.id}</p>
        <h3>{p.title}</h3>
        <p className="ls-post-meta">
          <span className={`g-badge ${cls}`}>{label}</span>
          <span>{p.ground === "room" ? "Room" : "Paper"} · {p.template}</span>
          <span>{SCHEDULE[p.id]}</span>
          {p.pin && <span>Pin {p.pin}</span>}
        </p>
        <h4>Caption</h4>
        <p className="ls-caption">{p.caption}</p>
        <h4>Alt text</h4>
        <p className="ls-alt">{p.alt}</p>
        <h4>Needs a yes before posting</h4>
        <ul className="ls-approvals">
          {p.approvals.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <p className="ls-file">
          concepts/exports/{p.id}-{p.slug}.png
        </p>
      </div>
    </article>
  );
}

function Studies() {
  const [hour, setHour] = useState(16.6);
  return (
    <div className="ls-studies">
      <h3>The coded studies</h3>
      <p className="ls-small">Both businesses are fictional. Each site says so in its own footer, as well as on every post.</p>
      <figure className="ls-site">
        <div className="ls-site-label">
          <span className="g-badge g-badge-spec">Speculative</span> Study 01 · Ottoline, a fictional salon · 1440 × 900
        </div>
        <Frame width={1440} height={900} className="g-site-frame" label="Ottoline, a fictional salon homepage">
          <OttolineSite />
        </Frame>
      </figure>
      <figure className="ls-site">
        <div className="ls-site-label">
          <span className="g-badge g-badge-spec">Speculative</span> Study 02 · Hesper, a fictional shepherd’s hut ·
          the homepage follows the light
        </div>
        <Frame width={1440} height={900} className="g-site-frame" label={`Hesper, a fictional stay, at ${hourLabel(hour)}`}>
          <HesperSite hour={hour} />
        </Frame>
        <label className="ls-slider">
          <span>Time at the hut</span>
          <input type="range" min="0" max="23.9" step="0.1" value={hour} onChange={(e) => setHour(Number(e.target.value))} />
          <b>{hourLabel(hour)}</b>
        </label>
      </figure>
    </div>
  );
}

function ExportNote() {
  return (
    <div className="ls-export">
      <h3>Exporting</h3>
      <ol>
        <li>
          <code>npm run dev</code> and leave it running.
        </li>
        <li>
          In a second terminal: <code>node concepts/export-posts.mjs</code>. It writes the nine posts, the profile image, the
          grid preview and a contact sheet to <code>concepts/exports/</code>, and checks every post is exactly 1080 × 1350.
        </li>
        <li>
          One post only: <code>node concepts/export-posts.mjs --only 05</code>. Without the global Playwright CLI, open{" "}
          <code>/concepts/export.html?post=05</code> in Chrome, open DevTools, right-click the <code>#export</code> element
          and choose “Capture node screenshot” (at 100% zoom, on a screen with display scaling at 100%).
        </li>
      </ol>
    </div>
  );
}
