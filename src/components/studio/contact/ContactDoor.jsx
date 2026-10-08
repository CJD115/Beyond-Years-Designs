import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";
import { PROJECT_TYPES, useEnquiryForm } from "./useEnquiryForm";
import { openDoor, useDoorOpen } from "./doorState";
import { Door, FloorLight, Warmth } from "./DoorLight";

// Contact, "The Door Left Open" (Thresholds direction, p.10 of
// Beyond-Years-Redesign-04-Thresholds-v2.pdf). The journey ends where it
// began: a door left ajar, its light spilling towards the form. The light in
// the gap flickers gently; sending an enquiry swings the door wider and warms
// the room. Pairs with FooterDoor, where the light crosses the floor.
//
// Desktop (900px and up) is the 1440px mock-up scaled to the window: --lu is
// one mock-up pixel. Smaller screens follow the 390px phone mock-up, with the
// door above the heading.

const LABEL =
  "block text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/60 lg:text-[max(10px,calc(var(--lu)*10.5))] lg:font-normal";
const FIELD =
  "font-display block w-full rounded-none border-0 border-b border-[#f1ebe3]/30 bg-transparent px-0 text-[21px] font-light tracking-normal text-[#f1ebe3]/90 caret-accent placeholder:italic placeholder:font-normal placeholder:text-[#f1ebe3]/32 focus-visible:border-accent transition-colors duration-300 lg:border-[#f1ebe3]/28 lg:text-[max(18px,calc(var(--lu)*24))]";
const ERROR = "mt-2 text-[13px] text-accent";

export default function ContactDoor() {
  const open = useDoorOpen();
  const { projectType, chooseProjectType, status, sending, sentTo, errors, handleSubmit } = useEnquiryForm({
    onSent: openDoor,
  });

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#13110d] text-[#f1ebe3] lg:[--lu:min(calc(100vw/1440),1.25px)]"
    >
      <Warmth open={open} />

      {/* Phones: the light falls from the door, across the heading */}
      <FloorLight size="phone" open={open} className="left-[calc(50%+35px)] top-[276px] h-[344px] w-[387px] lg:hidden" />

      <div className="relative mx-auto w-full px-6 pb-12 md:px-10 lg:max-w-[calc(var(--lu)*1440)] lg:px-[calc(var(--lu)*64)] lg:pb-[calc(var(--lu)*109)]">
        <Door
          open={open}
          className="mx-auto mt-[36px] lg:absolute lg:bottom-0 lg:left-[calc(var(--lu)*146)] lg:mx-0 lg:mt-0"
        />
        {/* Phones: the floor line under the door (on desktop it's the
            footer's top edge) */}
        <div aria-hidden="true" className="-mx-6 h-px bg-[#f1ebe3]/10 md:-mx-10 lg:hidden" />

        <div className="lg:ml-[calc(var(--lu)*556)] lg:pt-[calc(var(--lu)*120)]">
          <p data-join className="mt-[23px] text-[12px] font-medium uppercase leading-[1.21] tracking-[0.22em] text-[#f1ebe3]/75 lg:mt-0 lg:text-[max(10.5px,calc(var(--lu)*11))] lg:font-normal">
            Get started
          </p>
          <h2 className="font-display mt-3 text-[44px] font-light leading-none tracking-normal lg:mt-[calc(var(--lu)*14)] lg:text-[calc(var(--lu)*76)]">
            Your business has a story.
            <br className="hidden lg:block" />{" "}
            <span className="font-serif-italic text-accent">Let’s tell it.</span>
          </h2>
          <p className="font-serif-italic mt-[14px] text-[21px] leading-[1.21] tracking-normal text-[#f1ebe3]/60 lg:mt-[calc(var(--lu)*18)] lg:text-[calc(var(--lu)*26)]">
            The door’s open. Come in.
          </p>
          <p className="mt-[14px] text-[14px] leading-[1.6] text-[#f1ebe3]/60 lg:mt-[calc(var(--lu)*14)] lg:text-[max(13px,calc(var(--lu)*14))]">
            Or email us directly:{" "}
            {SITE.founders.map(({ email }, i) => (
              // each on its own line on phones, one line from 640px up
              <span key={email} className="block sm:inline">
                {i > 0 && (
                  <span aria-hidden="true" className="hidden sm:inline">
                    {" · "}
                  </span>
                )}
                <a href={`mailto:${email}`} className="link-underline link-underline-light text-[#f1ebe3]/85 hover:text-accent">
                  {email}
                </a>
              </span>
            ))}
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <fieldset
              className="m-0 mt-[34px] border-0 p-0 lg:mt-[calc(var(--lu)*80)]"
              aria-describedby={errors.projectType ? "project-type-error" : undefined}
            >
              <legend className={LABEL}>I am looking for</legend>
              <div className="mt-[10px] flex flex-wrap gap-2 lg:mt-[calc(var(--lu)*10.5)] lg:gap-[calc(var(--lu)*8)]">
                {PROJECT_TYPES.map((type) => {
                  const chosen = projectType === type;
                  return (
                    <label key={type} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="projectType"
                        value={type}
                        checked={chosen}
                        onChange={() => chooseProjectType(type)}
                        className="peer pointer-events-none absolute h-0 w-0 opacity-0"
                        required
                      />
                      <span
                        className={`inline-flex h-11 items-center border px-[15px] text-[14px] leading-none transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent lg:h-[max(44px,calc(var(--lu)*44))] lg:px-[calc(var(--lu)*17)] lg:text-[max(12.5px,calc(var(--lu)*13.5))] ${
                          chosen
                            ? "border-accent bg-accent/18 text-[#f1ebe3]"
                            : "border-[#f1ebe3]/30 text-[#f1ebe3]/80 hover:border-[#f1ebe3]/60"
                        }`}
                      >
                        {type.replace("'", "’")}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.projectType && (
                <p id="project-type-error" className={ERROR} role="alert">
                  {errors.projectType}
                </p>
              )}
            </fieldset>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-[calc(var(--lu)*32)]">
              <Field
                id="contact-name"
                label="Your name"
                name="name"
                placeholder="What should we call you?"
                autoComplete="name"
                error={errors.name}
                className="mt-[26px] lg:mt-[calc(var(--lu)*22)]"
              />
              <Field
                id="contact-email"
                label="Email"
                name="email"
                type="email"
                placeholder="hello@example.com"
                autoComplete="email"
                error={errors.email}
                className="mt-[26px] lg:mt-[calc(var(--lu)*22)]"
              />
              <Field
                id="contact-message"
                label="Project details"
                name="message"
                placeholder="What do you do, and what would you like your website to do better?"
                textarea
                error={errors.message}
                className="mt-[26px] lg:col-span-2 lg:mt-[calc(var(--lu)*22)]"
              />
            </div>

            {/* Honeypot (Web3Forms' botcheck): display:none, so it's out of reach of people and screen readers */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="mt-[26px] flex flex-col items-start lg:mt-[calc(var(--lu)*26.6)] lg:flex-row lg:justify-between">
              <button
                type="submit"
                disabled={sending}
                aria-describedby="contact-privacy"
                className="group inline-flex items-center gap-[0.3em] border-b border-[#f1ebe3] pt-[10px] pb-[14px] text-[16px] font-medium leading-[1.21] transition-colors duration-300 hover:border-accent hover:text-accent disabled:cursor-wait disabled:opacity-60 disabled:hover:border-[#f1ebe3] disabled:hover:text-[#f1ebe3] lg:pt-[calc(var(--lu)*10)] lg:pb-[calc(var(--lu)*14)] lg:text-[max(15px,calc(var(--lu)*16))]"
              >
                {sending ? "Sending…" : "Start the conversation"}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-[0.95em] w-[0.95em] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-disabled:translate-x-0 group-disabled:translate-y-0"
                  strokeWidth={1.75}
                />
              </button>
              <p
                id="contact-privacy"
                className="mt-[10px] text-[13px] leading-[1.21] text-[#f1ebe3]/60 lg:mt-[calc(var(--lu)*12.6)] lg:text-[max(12px,calc(var(--lu)*12.5))]"
              >
                We’ll only use your details to reply.
              </p>
            </div>

            {/* Kept mounted so screen readers announce the message when it changes */}
            <div role="status" aria-live="polite">
              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-serif-italic mt-6 text-[21px] leading-[1.21] tracking-normal text-accent lg:text-[calc(var(--lu)*24)]"
                >
                  Thanks, {sentTo}. We’ve got your message and will be in touch soon.
                </motion.p>
              )}
            </div>
            {status === "failed" && (
              <p className="mt-6 text-[14px] text-accent" role="alert">
                Sorry, your message didn’t send. Please try again in a moment, or email{" "}
                {SITE.founders.map(({ name, email }, i) => (
                  <span key={email}>
                    {i > 0 && " or "}
                    {name} at{" "}
                    <a href={`mailto:${email}`} className="link-underline link-underline-light">
                      {email}
                    </a>
                  </span>
                ))}
                .
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, name, placeholder, type = "text", autoComplete, textarea = false, error, className = "" }) {
  const shared = {
    id,
    name,
    placeholder,
    required: true,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      {textarea ? (
        <textarea
          {...shared}
          className={`${FIELD} mt-[2px] h-[93px] resize-none pt-[7.5px] pb-[10.5px] leading-[25px] lg:mt-[calc(var(--lu)*2.5)] lg:h-[calc(var(--lu)*78)] lg:min-h-[78px] lg:pt-[calc(var(--lu)*10)] lg:pb-[calc(var(--lu)*10)] lg:leading-[1.21]`}
        />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          className={`${FIELD} mt-[9px] pb-[10px] leading-[1.21] lg:mt-[calc(var(--lu)*12)] lg:pb-[calc(var(--lu)*10)]`}
        />
      )}
      {error && (
        <p id={`${id}-error`} className={ERROR} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
