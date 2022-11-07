import { AnkiField } from "models/AnkiField";
import { atom, selector } from "recoil";

export const ANKI_FIELDS = 'ankiFields';

const ankiFieldsState = atom<AnkiField[]>({
  key: `${ANKI_FIELDS}State`,
  default: [],
})

export const ankiFieldsSelector = selector<AnkiField[]>({
  key: ANKI_FIELDS,
  get: ({get}) => get(ankiFieldsState),
  set: ({set}, newValue) => {
    if (chrome.storage) {
      const json = JSON.stringify(newValue);      
      chrome.storage.sync.set({[ANKI_FIELDS]: json}, () => console.log(json))
    }
    return set(ankiFieldsState, newValue);
    
  }
})