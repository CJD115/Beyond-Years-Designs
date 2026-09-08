import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function FinalCTA() {
  const [projectType, setProjectType] = useState("option one");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative bg-foreground text-background py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="border-t border-background/20 pt-10">
          <p className="eyebrow text-background/60 mb-6">Get Started</p>
          <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.9] tracking-[-0.03em] text-balance">
            Lorem ipsum dolor
            <br />
            <span className="font-serif-italic text-accent">sit amet.</span>
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="text-lg text-background/70 leading-relaxed max-w-sm mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              vitae elit libero, a pharetra augue. Integer posuere erat a ante.
            </p>
            <dl className="flex flex-col gap-6 text-sm">
              <div>
                <dt className="eyebrow text-background/50 mb-1">Email</dt>
                <dd>
                  <a href="mailto:hello@example.com" className="link-underline link-underline-light">
                    hello@example.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-background/50 mb-1">Studio</dt>
                <dd className="text-background/80">City, Country</dd>
              </div>
              <div>
                <dt className="eyebrow text-background/50 mb-1">Hours</dt>
                <dd className="text-background/80">Mon-Fri, 9 to 5</dd>
              </div>
            </dl>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-6 md:col-start-7 flex flex-col gap-8">
            <div>
              <label className="eyebrow text-background/50 block mb-3">
                I am looking for
              </label>
              <div className="flex flex-wrap gap-2">
                {["option one", "option two", "option three", "option four"].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setProjectType(t)}
                    className={`px-4 py-2 text-sm border transition-colors duration-300 ${
                      projectType === t
                        ? "border-accent bg-accent text-background"
                        : "border-background/30 text-background/70 hover:border-background/60"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <Field label="Your name" name="name" placeholder="Lorem Ipsum" />
            <Field label="Email" name="email" type="email" placeholder="hello@example.com" />
            <Field
              label="Project details"
              name="message"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              textarea
            />

            <button
              type="submit"
              className="group inline-flex items-center gap-2 self-start border-b border-background pb-1 text-lg font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Contact
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
            </button>

            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-accent"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, placeholder, type = "text", textarea = false }) {
  const cls =
    "w-full bg-transparent border-0 border-b border-background/20 px-0 py-3 text-background placeholder:text-background/30 focus:border-accent focus:outline-none transition-colors duration-300";
  return (
    <div>
      <label className="eyebrow text-background/50 block mb-1">{label}</label>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} rows={3} className={cls} />
      ) : (
        <input type={type} name={name} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}