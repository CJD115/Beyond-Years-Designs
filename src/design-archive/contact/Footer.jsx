import FooterDoor from "@/components/studio/contact/FooterDoor";
import FooterOriginal from "@/design-archive/contact/FooterOriginal";
import { contactDesign } from "@/design-archive/contact/design";

// Footer. Swapped together with the contact section; see ./contact/design.js.
export default function Footer() {
  return contactDesign() === "door" ? <FooterDoor /> : <FooterOriginal />;
}
