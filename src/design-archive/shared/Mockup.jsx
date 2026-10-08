export default function Mockup({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden border border-border bg-secondary shadow-[0_40px_80px_-40px_rgba(18,18,18,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}