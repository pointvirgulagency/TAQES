import fr from "./fr";
import ar from "./ar";

export const translations = {
  fr,
  ar,
};

export type Locale = keyof typeof translations;