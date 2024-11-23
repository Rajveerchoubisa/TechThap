import { atom } from "recoil";

// Atom for loading state
const loadingAtom = atom({
    key: "loadingAtom",
    default: true, // Initially set to true to indicate loading
});

export default loadingAtom;