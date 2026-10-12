import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command, mode, isSsrBuild }) => {
  // Without the Web3Forms key the contact form builds fine but can never send
  // (src/components/studio/contact/useEnquiryForm.js), so a production build
  // stops instead of shipping it. Set ALLOW_MISSING_FORM_KEY=1 to build anyway,
  // e.g. to test a build that won't be uploaded.
  if (command === "build" && !isSsrBuild && !process.env.ALLOW_MISSING_FORM_KEY) {
    const { VITE_WEB3FORMS_ACCESS_KEY } = loadEnv(mode, process.cwd(), "VITE_");
    if (!VITE_WEB3FORMS_ACCESS_KEY) {
      throw new Error(
        "VITE_WEB3FORMS_ACCESS_KEY is not set, so the contact form couldn't send. Add it to .env.local (see .env.example), or set ALLOW_MISSING_FORM_KEY=1 for a build you won't upload.",
      );
    }
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // The server build (dist-ssr/, used only to prerender pages) needs no public/ files
    build: { copyPublicDir: !isSsrBuild },
  };
});
