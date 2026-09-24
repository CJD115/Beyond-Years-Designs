import Reveal from "./Reveal";

const ADDONS = [
  {
    no: "01",
    name: "Hosting",
    span: "md:col-span-7",
    edge: "md:border-r",
    body: "",
  },
  {
    no: "02",
    name: "Domain",
    span: "md:col-span-5",
    edge: "",
    body: "",
  },
  {
    no: "03",
    name: "Maintenance",
    span: "md:col-span-5",
    edge: "md:border-r",
    body: "",
  },
  {
    no: "04",
    name: "Updates & Content",
    span: "md:col-span-7",
    edge: "",
    body: "",
  },
  {
    no: "05",
    name: "Support",
    span: "md:col-span-7",
    edge: "md:border-r",
    body: "",
  },
  {
    no: "06",
    name: "Performance, Security & Backups",
    span: "md:col-span-5",
    edge: "",
    body: "",
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
              Beyond launch
              <br />
              <span className="font-serif-italic text-accent"></span>
            </h2>
            <div className="md:col-span-5 flex flex-col justify-end">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
                
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 md:mt-12">
          <p className="text-sm text-muted-foreground/80">
            <span className="text-foreground"></span>
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