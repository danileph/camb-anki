import { WordType } from "models/WordType";
import { atom } from "recoil";

export const wordDataState = atom<WordType[] | undefined>({
  key: 'wordData',
  default: undefined,
})