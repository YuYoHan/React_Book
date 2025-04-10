import { atom } from "recoil";

const initState = {
    email: "",
};

const signinState = atom({
    key: "signinState",
    default: initState,
});

export default signinState;
