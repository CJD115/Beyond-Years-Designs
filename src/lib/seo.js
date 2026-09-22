import { useEffect } from "react";

function upsertMeta(attr, key, content) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(attr, key) {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

function toAbsoluteUrl(value) {
  if (!value) return "";
  try {
    return new URL(value, window.location.origin).toString();
  } catch {
    return "";
  }
}

export function useSeo({ title, description, type = "website", image }) {
  useEffect(() => {
    if (!title || !description) return;

    document.title = title;

    upsertMeta("name", "description", description);

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:site_name", "Beyond Years Designs");
    upsertMeta("property", "og:url", window.location.href);

    const resolvedImage = toAbsoluteUrl(image);
    if (resolvedImage) {
      upsertMeta("property", "og:image", resolvedImage);
      upsertMeta("name", "twitter:card", "summary_large_image");
      upsertMeta("name", "twitter:image", resolvedImage);
    } else {
      removeMeta("property", "og:image");
      upsertMeta("name", "twitter:card", "summary");
      removeMeta("name", "twitter:image");
    }

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
  }, [title, description, type, image]);
}
