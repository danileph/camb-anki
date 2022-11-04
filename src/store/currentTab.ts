import { atom, selector } from "recoil";

export type CurrentTabType = 'search' | 'add' | 'settings' | 'about';

export const CURRENT_TAB = 'currentTab';

const currentTabState = atom<CurrentTabType>({
  key: `${CURRENT_TAB}State`,
  default: 'search',
})

export const currentTabSelector = selector<CurrentTabType>({
  key: CURRENT_TAB,
  get: ({get}) => get(currentTabState),
  set: ({set}, newValue) => {
    if (chrome.storage) {
      chrome.storage.sync.set({[CURRENT_TAB]: newValue})
    }
    return set(currentTabState, newValue);
    
  }
})