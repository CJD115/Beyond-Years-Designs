// Consistent frame for website mockup imagery — a thin rule and a soft,
// editorial shadow. The generated mockups carry their own browser chrome,
// so this just adds definition and depth without doubling up.
export default function Mockup({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden border border-border bg-secondary shadow-[0_40px_80px_-40px_rgba(18,18,18,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}