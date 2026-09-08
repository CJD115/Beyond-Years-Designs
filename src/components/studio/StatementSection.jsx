import Reveal from "./Reveal";
import { Image } from "@/components/ui/image";

export default function StatementSection() {
  return (
    <section className="relative overflow-hidden bg-accent text-foreground py-24 md:py-40 grain">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal className="md:col-span-7">
            <p className="eyebrow mb-8 text-foreground/60">Lorem Ipsum</p>
            <h2 className="font-display text-[10vw] md:text-[5.4vw] leading-[0.98] tracking-[-0.02em] text-balance">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              <span className="font-serif-italic">eiusmod tempor.</span>
            </h2>
            <p className="mt-10 max-w-md text-base md:text-lg leading-relaxed text-foreground/70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante venenatis dapibus posuere velit aliquet.
              Maecenas faucibus mollis interdum, donec ullamcorper nulla non
              metus auctor fringilla.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-5">
            <div className="relative aspect-4/5 w-full overflow-hidden border border-foreground/15 shadow-2xl shadow-black/20">
              <Image
                src="https://media.base44.com/images/public/6a9f0520fb3bd22955315e44/72708a541_generated_image.png"
                alt="Lorem ipsum placeholder studio image"
                fittingType="fill"
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}