import { atom, selector } from "recoil";

export const CURRENT_NOTE_TYPE = 'currentNoteType';

const currentNoteTypeState = atom<string | undefined>({
  key: `${CURRENT_NOTE_TYPE}State`,
  default: 'search',
})

export const currentNoteTypeSelector = selector<string | undefined>({
  key: CURRENT_NOTE_TYPE,
  get: ({get}) => get(currentNoteTypeState),
  set: ({set}, newValue) => {
    if (chrome.storage) {
      chrome.storage.sync.set({[CURRENT_NOTE_TYPE]: newValue})
    }
    return set(currentNoteTypeState, newValue);
    
  }
})