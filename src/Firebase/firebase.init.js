import firebaseConfig from "./firebase.config";
import { initializeApp } from "firebase/app";

const initializeAuthentication = () => {
    const app = initializeApp(firebaseConfig);
}

export default initializeAuthentication;
