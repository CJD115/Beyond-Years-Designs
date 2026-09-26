import { useEffect } from "react";
import { SITE, absoluteUrl } from "@/data/site";

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

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Keeps the head in step with the route after client-side navigation. The
// same tags are written into each prerendered page at build time
// (scripts/prerender-meta.mjs), which is what crawlers and link previews read.
export function useSeo({ title, description, type = "website", image = SITE.ogImage, path, noindex = false }) {
  useEffect(() => {
    if (!title || !description) return;

    document.title = title;

    upsertMeta("name", "description", description);

    if (noindex) {
      upsertMeta("name", "robots", "noindex");
      document.head.querySelector('link[rel="canonical"]')?.remove();
      removeMeta("property", "og:url");
    } else {
      removeMeta("name", "robots");
      if (path) {
        upsertCanonical(absoluteUrl(path));
        upsertMeta("property", "og:url", absoluteUrl(path));
      }
    }

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:site_name", SITE.name);
    upsertMeta("property", "og:locale", SITE.locale);

    upsertMeta("property", "og:image", absoluteUrl(image));
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:image", absoluteUrl(image));
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
  }, [title, description, type, image, path, noindex]);
}
