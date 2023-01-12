import { atom } from "recoil";

export const showFormAtom = atom({
  key: "showFormState",
  default: false,
});
export const formDataAtom = atom({
  key: "formDataState",
  default: {},
});
export const userIDAtom = atom({
  key: "userIdState",
  default: null,
});