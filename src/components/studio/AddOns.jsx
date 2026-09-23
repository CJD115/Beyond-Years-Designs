import Reveal from "./Reveal";

const ADDONS = [
  {
    no: "01",
    name: "Hosting",
    span: "md:col-span-7",
    edge: "md:border-r",
    body: "Reliable hosting for your site, with the technical setup, SSL and renewals handled for you. Your site sits on infrastructure we trust and look after.",
  },
  {
    no: "02",
    name: "Domain",
    span: "md:col-span-5",
    edge: "",
    body: "We can register, connect and manage your domain — renewals, DNS and the small print included, so you never lose it by accident.",
  },
  {
    no: "03",
    name: "Maintenance",
    span: "md:col-span-5",
    edge: "md:border-r",
    body: "Small updates, fixes and tweaks after launch — the little jobs that keep a site tidy and correct as time passes.",
  },
  {
    no: "04",
    name: "Updates & Content",
    span: "md:col-span-7",
    edge: "",
    body: "New pages, fresh copy, swapped images, seasonal changes. When the site needs to evolve, we make the edits so you don't have to.",
  },
  {
    no: "05",
    name: "Support",
    span: "md:col-span-7",
    edge: "md:border-r",
    body: "A direct line to the people who built it. When something needs explaining, changing or fixing, you speak to us — not a helpdesk.",
  },
  {
    no: "06",
    name: "Performance, Security & Backups",
    span: "md:col-span-5",
    edge: "",
    body: "Ongoing care to keep the site fast, secure and backed up — updates applied, things monitored, and a recent copy always to hand.",
  },
];

export default function AddOns() {
  return (
    <section className="relative py-24 md:py-36 bg-secondary/40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="border-t border-border pt-10">
          <p className="eyebrow mb-4">Optional Add-ons</p>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <h2 className="md:col-span-7 font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
              Beyond launch,
              <br />
              <span className="font-serif-italic text-accent">we can stay on.</span>
            </h2>
            <div className="md:col-span-5 flex flex-col justify-end">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
                A website needs looking after once it's live — hosting, updates,
                the occasional fix. If you'd rather not manage the technical
                side yourself, we can take it on, so your site stays secure,
                fast and current without you lifting a finger.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 md:mt-12">
          <p className="text-sm text-muted-foreground/80">
            <span className="text-foreground">Optional</span> — added to any
            project, priced to fit the work rather than a fixed package.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-12 border-t border-border">
          {ADDONS.map((item, i) => (
            <Reveal
              key={item.no}
              delay={(i % 2) * 0.08}
              className={`group col-span-12 ${item.span} ${item.edge} border-b border-border p-8 md:p-10 transition-colors duration-500 hover:bg-background/60`}
            >
              <div className="flex items-baseline gap-5">
                <span className="font-display text-2xl md:text-3xl text-muted-foreground transition-colors duration-500 group-hover:text-accent">
                  {item.no}
                </span>
                <h3 className="font-display text-2xl md:text-4xl leading-none transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                  {item.name}
                </h3>
              </div>
              <p className="mt-5 max-w-md text-sm md:text-base text-muted-foreground leading-relaxed">
                {item.body}
              </p>
              <span className="mt-6 block h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-16" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}