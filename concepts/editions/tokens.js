// Canvas and honesty-status tokens for the Editions system. See DESIGN-SYSTEM.md.

export const W = 1080;
export const H = 1350;
export const FLOOR = 1110;
export const MARGIN = 80;

export const STATUS = {
  commissioned: (detail) => `Commissioned${detail ? ` · ${detail}` : ""}`,
  speculative: (detail) => `Speculative · ${detail} · Not a client`,
  illustrative: () => "Illustrative example · Invented copy",
  studio: (detail) => `Studio${detail ? ` · ${detail}` : ""}`,
};
