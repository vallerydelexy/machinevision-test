import { atom } from "recoil";

export const previewImageStateAtom = atom({
  key: "previewImageState",
  default: false,
});

export const previewImageSourceAtom = atom({
    key: "previewImageSource",
    default: "",
})