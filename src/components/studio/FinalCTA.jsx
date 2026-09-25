import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function FinalCTA() {
  const [projectType, setProjectType] = useState("");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const projectTypeOptions = ["Start from scratch", "Refresh my website", "Improve my messaging", "Not sure yet, let's chat"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const nextErrors = {};

    if (!projectType) nextErrors.projectType = "Please select a project type.";
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!message) nextErrors.message = "Please share a few project details.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSent(false);
      return;
    }

    setSent(true);
  };

  return (
    <section id="contact" className="relative bg-foreground text-background py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="border-t border-background/20 pt-10">
          <p className="eyebrow text-background/60 mb-6">Get Started</p>
          <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.9] tracking-[-0.03em] text-balance">
            Your business has a story.
            <br />
            <span className="font-serif-italic text-accent">Let's tell it.</span>
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="text-lg text-background/70 leading-relaxed max-w-sm mb-10">
              Tell us your story. What you do, who it's for, and what you need. We'll take it from there, together.
            </p>
            <dl className="flex flex-col gap-6 text-sm">
              <div>
                <dt className="eyebrow text-background/50 mb-1">Email</dt>
                <dd>
                  <a href="mailto:hello@example.com" className="link-underline link-underline-light inline-flex min-h-11 items-center py-1">
                    hello@example.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-background/50 mb-1">Studio</dt>
                <dd className="text-background/80">Bristol, England</dd>
              </div>
              <div>
                <dt className="eyebrow text-background/50 mb-1">Hours</dt>
                <dd className="text-background/80">Mon-Fri, 9 to 5</dd>
              </div>
            </dl>
          </div>

          <form onSubmit={handleSubmit} noValidate className="md:col-span-6 md:col-start-7 flex flex-col gap-8">
            <fieldset
              className="border-0 p-0 m-0"
              aria-describedby={errors.projectType ? "project-type-error" : undefined}
            >
              <legend className="eyebrow text-background/50 block mb-3">I am looking for</legend>
              <div className="flex flex-wrap gap-2">
                {projectTypeOptions.map((t) => (
                  <label key={t} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="projectType"
                      value={t}
                      checked={projectType === t}
                      onChange={() => {
                        setProjectType(t);
                        setErrors((prev) => ({ ...prev, projectType: undefined }));
                      }}
                      className="peer"
                      style={{
                        position: "absolute",
                        opacity: 0,
                        width: 0,
                        height: 0,
                        pointerEvents: "none",
                      }}
                      required
                    />
                    <span
                      className={`inline-flex min-h-11 items-center px-4 py-2 text-sm border transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-accent peer-focus-visible:outline-offset-3 ${
                        projectType === t
                          ? "border-accent bg-accent text-background"
                          : "border-background/30 text-background/70 hover:border-background/60"
                      }`}
                    >
                      {t}
                    </span>
                  </label>
                ))}
              </div>
              {errors.projectType && (
                <p id="project-type-error" className="mt-2 text-sm text-accent" role="alert">
                  {errors.projectType}
                </p>
              )}
            </fieldset>

            <Field
              id="contact-name"
              label="Your name"
              name="name"
              placeholder="What should we call you?"
              required
              error={errors.name}
            />
            <Field
              id="contact-email"
              label="Email"
              name="email"
              type="email"
              placeholder="hello@example.com"
              required
              error={errors.email}
            />
            <Field
              id="contact-message"
              label="Project details"
              name="message"
              placeholder="What do you do, and what would you like your website to do better?"
              textarea
              required
              error={errors.message}
            />

            <button
              type="submit"
              className="group inline-flex min-h-11 items-center gap-2 self-start border-b border-background py-1 text-lg font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Start the conversation
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
            </button>

            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-accent"
                role="status"
                aria-live="polite"
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

function Field({ id, label, name, placeholder, type = "text", textarea = false, required = false, error }) {
  const describedBy = error ? `${id}-error` : undefined;
  const cls =
    "w-full bg-transparent border-0 border-b border-background/20 px-0 py-3 text-background placeholder:text-background/30 focus-visible:border-accent transition-colors duration-300";

  return (
    <div>
      <label htmlFor={id} className="eyebrow text-background/50 block mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          rows={3}
          className={cls}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          className={cls}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}