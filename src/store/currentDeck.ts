import { atom, selector } from "recoil";

export const CURRENT_DECK = 'currentDeck';

const currentDeckState = atom<string | undefined>({
  key: `${CURRENT_DECK}State`,
  default: 'search',
})

export const currentDeckSelector = selector<string | undefined>({
  key: CURRENT_DECK,
  get: ({get}) => get(currentDeckState),
  set: ({set}, newValue) => {
    if (chrome.storage) {
      chrome.storage.sync.set({[CURRENT_DECK]: newValue})
    }
    return set(currentDeckState, newValue);
    
  }
})