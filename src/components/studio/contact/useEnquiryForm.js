import { useState } from "react";
import { SITE } from "@/data/site";

// The contact form's behaviour, shared by every contact design: checking the
// fields, sending through Web3Forms, and the sending / sent / failed states.
//
// Enquiries go through Web3Forms, which emails them to the inbox the access key
// was created with (change it in their dashboard, not here). The key is public
// by design, but it lives in .env.local rather than the repo; see .env.example.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export const PROJECT_TYPES = ["Start from scratch", "Refresh my website", "Improve my messaging", "Not sure yet, let's chat"];

export function useEnquiryForm({ onSent } = {}) {
  const [projectType, setProjectType] = useState("");
  // idle | sending | sent | failed
  const [status, setStatus] = useState("idle");
  const [sentTo, setSentTo] = useState("");
  const [errors, setErrors] = useState({});

  const chooseProjectType = (type) => {
    setProjectType(type);
    setErrors((prev) => ({ ...prev, projectType: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const nextErrors = {};

    if (!projectType) nextErrors.projectType = "Please select a project type.";
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!message) nextErrors.message = "Please share a few project details.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    const firstName = name.split(/\s+/)[0];
    const done = () => {
      form.reset();
      setProjectType("");
      setSentTo(firstName);
      setStatus("sent");
      onSent?.();
    };

    // Honeypot: people never see this field, so anything in it is a bot.
    // Look sent, but don't pass it on.
    if (formData.get("botcheck")) {
      done();
      return;
    }

    setStatus("sending");
    try {
      if (!WEB3FORMS_KEY) throw new Error("VITE_WEB3FORMS_ACCESS_KEY is not set");
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          // connor@'s Webmail filter copies subjects containing "New enquiry from"
          // to mike@, so update that filter if this wording changes
          subject: `New enquiry from ${name}: ${projectType}`,
          from_name: `${SITE.name} website`,
          name,
          email,
          looking_for: projectType,
          message,
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.success) throw new Error(result.message || `Web3Forms responded ${res.status}`);
      done();
    } catch (err) {
      console.error("Contact form failed to send:", err);
      setStatus("failed");
    }
  };

  return {
    projectType,
    chooseProjectType,
    status,
    sending: status === "sending",
    sentTo,
    errors,
    handleSubmit,
  };
}
