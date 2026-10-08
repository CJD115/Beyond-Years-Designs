import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/studio/Reveal";
import { SITE } from "@/data/site";
import { PROJECT_TYPES, useEnquiryForm } from "@/components/studio/contact/useEnquiryForm";

// Contact, the original design: the big "Your business has a story" heading,
// a short intro on the left and the form on the right. The form's sending
// logic is shared with the other contact designs (useEnquiryForm).
export default function ContactOriginal() {
  const { projectType, chooseProjectType, status, sending, sentTo, errors, handleSubmit } = useEnquiryForm();
  const projectTypeOptions = PROJECT_TYPES;

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
              {SITE.email && (
                <div>
                  <dt className="eyebrow text-background/50 mb-1">Email</dt>
                  <dd>
                    <a href={`mailto:${SITE.email}`} className="link-underline link-underline-light inline-flex min-h-11 items-center py-1">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="eyebrow text-background/50 mb-1">Studio</dt>
                <dd className="text-background/80">Bristol, England</dd>
              </div>
              {/* <div>
                <dt className="eyebrow text-background/50 mb-1">Hours</dt>
                <dd className="text-background/80">Mon-Fri, 9 to 5</dd>
              </div> */}
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
                      onChange={() => chooseProjectType(t)}
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
              autoComplete="name"
              required
              error={errors.name}
            />
            <Field
              id="contact-email"
              label="Email"
              name="email"
              type="email"
              placeholder="hello@example.com"
              autoComplete="email"
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

            {/* Honeypot (Web3Forms' botcheck): display:none, so it's out of reach of people and screen readers */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="flex flex-col items-start gap-4">
              <p id="contact-privacy" className="text-sm text-background/60">
                We'll only use your details to reply to your enquiry.
              </p>
              <button
                type="submit"
                disabled={sending}
                aria-describedby="contact-privacy"
                className="group inline-flex min-h-11 items-center gap-2 border-b border-background py-1 text-lg font-medium transition-colors hover:border-accent hover:text-accent disabled:cursor-wait disabled:opacity-60 disabled:hover:border-background disabled:hover:text-background"
              >
                {sending ? "Sending…" : "Start the conversation"}
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-disabled:translate-x-0 group-disabled:translate-y-0" strokeWidth={1.5} />
              </button>
            </div>

            {/* Kept mounted so screen readers announce the message when it changes */}
            <div role="status" aria-live="polite">
              {status === "sent" && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-accent">
                  Thanks, {sentTo}. We've got your message and will be in touch soon.
                </motion.p>
              )}
            </div>
            {status === "failed" && (
              <p className="text-sm text-accent" role="alert">
                Sorry, your message didn't send. Please try again in a moment
                {SITE.email ? (
                  <>
                    , or email us at{" "}
                    <a href={`mailto:${SITE.email}`} className="link-underline link-underline-light">
                      {SITE.email}
                    </a>
                    .
                  </>
                ) : (
                  "."
                )}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, name, placeholder, type = "text", autoComplete, textarea = false, required = false, error }) {
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
          autoComplete={autoComplete}
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