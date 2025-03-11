import { create } from "zustand";
const useMyStore = create(() => {
  return {
    produkts: [],
    cards: [],
    savatcha: [],
    like: [],
    haridlar: [],
  };
});
export default useMyStore;
