import { atom } from "recoil";

export const deleteDataTypeAtom = atom({
  key: "deleteDataTypeState",
  default: undefined,
});

export const deleteDataAtom = atom({
  key: "deleteDataState",
  default: false,
});
export const deleteDataIdAtom = atom({
  key: "deleteDataIdState",
  default: '',
});
