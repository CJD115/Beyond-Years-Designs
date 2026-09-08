import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Hero() {
  const [vw, setVw] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [0, -1.5]);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden grain">
      {/* Asymmetric website mockup — sits in the upper-right, moves slightly on scroll */}
      <motion.div
        style={{ y: mockupY, rotate: mockupRotate }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-0 top-24 w-[58%] md:top-28 md:w-[44%] lg:w-[40%] hidden sm:block"
      >
  
      </motion.div>

      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
        <div>
          <p className="eyebrow mb-10 md:mb-16">
            Placeholder Heading - Region Label
          </p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[15vw] leading-[0.92] tracking-[-0.03em] md:text-[12vw] lg:text-[10.5vw] text-balance"
        >
          Lorem ipsum
          <br />
          consectetur
          <br />
          <span className="font-serif-italic text-accent">sed eiusmod.</span>
        </motion.h1>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
              Maecenas a enim pellentesque, cursus risus sit amet, condimentum libero. 
              Phasellus sodales molestie vehicula. Cras vel dapibus eros, ut porttitor arcu. Nullam nisi nunc.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="flex flex-col gap-4 md:items-end">
              <a href="#work" className="link-underline text-base font-medium">
                View Work
              </a>
              <a href="#contact" className="link-underline text-base font-medium">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

       {/* <div className="pointer-events-none absolute left-6 md:left-10 lg:left-16 bottom-6 hidden md:block">
        <div className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>Live · {vw}px</span>
          </div>
          <div className="mt-1 text-foreground/60">Perf · 100</div>
        </div>
      </div> */}
    </section> 
  );
}