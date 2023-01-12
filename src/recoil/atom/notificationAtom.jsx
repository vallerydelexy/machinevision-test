import { atom } from "recoil";

export const notificationAtom = atom({
  key: "notificationState",
  default: false,
});
export const notificationTypeAtom = atom({
  key: "notificationTypeState",
  default: '',
});
export const notificationMessageAtom = atom({
  key: "notificationMessageState",
  default: '',
});