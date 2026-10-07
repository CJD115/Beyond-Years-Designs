import ContactDoor from "./contact/ContactDoor";
import ContactOriginal from "./contact/ContactOriginal";
import { contactDesign } from "./contact/design";

// Contact ("Your business has a story"). Both designs live in ./contact; the
// word in ./contact/design.js picks the one the site shows, together with its
// matching footer.
export default function FinalCTA() {
  return contactDesign() === "door" ? <ContactDoor /> : <ContactOriginal />;
}
