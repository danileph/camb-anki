import { atom } from "recoil";

export const searchErrorState = atom<Error | undefined>({
  key: 'searchError',
  default: undefined
})