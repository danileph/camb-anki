import { atom } from "recoil";

export const wordSuggestionsState = atom<string[] | undefined>({
  key: "wordSuggestions",
  default: undefined,
});
