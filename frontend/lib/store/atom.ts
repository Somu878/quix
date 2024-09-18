import { User } from "next-auth";
import { atom } from "recoil";
export const currentState = atom({
  key: "priceState",
  default: "",
});
export const userState = atom<User | null>({
  key: "userState",
  default: null,
});