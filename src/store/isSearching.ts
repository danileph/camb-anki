import { atom } from "recoil";

export const isSearchingState = atom<boolean>({
  key: 'isSearching',
  default: false,
})