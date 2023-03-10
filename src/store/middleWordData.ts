import { atom, selector } from "recoil";

export interface StateBound<T> {
  indexFields: number[];
  content?: T;
}

export interface MiddleWordData {
  word: StateBound<string>;
  partOfSpeech: StateBound<string>;
  formality: StateBound<string>;
  definition: StateBound<string>;
  example: StateBound<string>;
  // translate: StateBound<string>;
}

export const MIDDLE_WORD_DATA = "middleWordData";

export const middleWordDataState = atom<MiddleWordData>({
  key: `${MIDDLE_WORD_DATA}State`,
  default: {
    word: {
      indexFields: [],
      content: undefined,
    },
    partOfSpeech: {
      indexFields: [],
      content: undefined,
    },
    formality: {
      indexFields: [],
      content: undefined,
    },
    definition: {
      indexFields: [],
      content: undefined,
    },
    example: {
      indexFields: [],
      content: undefined,
    },
    // translate: {
    //   indexFields: [],
    //   content: undefined,
    // },
  },
});

export const middleWordDataSelector = selector<MiddleWordData>({
  key: MIDDLE_WORD_DATA,
  get: ({ get }) => get(middleWordDataState),
  set: ({ set }, newValue) => {
    if (chrome.storage) {
      const json = JSON.stringify(newValue);
      chrome.storage.sync.set({ [MIDDLE_WORD_DATA]: json }, () =>
        console.log(json)
      );
    }
    return set(middleWordDataState, newValue);
  },
});
