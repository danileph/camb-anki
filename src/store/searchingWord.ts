import { atom } from "recoil";

export const searchingWordState = atom<string>({
  key: 'searchingWord',
  default: ''
})