import { atom } from "recoil";

export const searchTriggerState = atom<boolean>({
  key: "searchTrigger",
  default: false,
});
