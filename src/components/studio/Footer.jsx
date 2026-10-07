import FooterDoor from "./contact/FooterDoor";
import FooterOriginal from "./contact/FooterOriginal";
import { contactDesign } from "./contact/design";

// Footer. Swapped together with the contact section; see ./contact/design.js.
export default function Footer() {
  return contactDesign() === "door" ? <FooterDoor /> : <FooterOriginal />;
}
