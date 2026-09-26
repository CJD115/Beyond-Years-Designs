import { motion } from "motion/react";

// `as` renders a different element (e.g. "li" inside a list) with the same reveal
export default function Reveal({ as = "div", children, delay = 0, y = 24, once = true, className = "" }) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
