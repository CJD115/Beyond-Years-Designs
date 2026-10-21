// Direction IV, Editions: the combined direction, adapted to the gallery's
// comparison slots so it can sit beside I–III. The posts themselves live in
// ../editions/.
import { FrontDoor, Residents as ResidentsPost, RoomOne, RoomTwo, StudyOne, Words as WordsPost } from "../editions/posts";
import { OttolineSite } from "../editions/sites";

export const Statement = FrontDoor;
export const Words = WordsPost;
export const Study = StudyOne;
export const Residents = ResidentsPost;
export const SalonSite = OttolineSite;

export function Room({ room }) {
  return room?.id === "groves" ? <RoomTwo /> : <RoomOne />;
}
