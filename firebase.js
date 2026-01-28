
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKkCLzhzhK8qtmaOBXEGyNNMfPVkRJjjs",
  authDomain: "ebdaa-academy.firebaseapp.com",
  projectId: "ebdaa-academy",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

/* ===== Admin Email (ثابت) ===== */
const ADMIN_EMAIL = "alwoshilschool@gmail.com";

/* ===== Watch Admin ===== */
export function watchAdmin(callback) {
  onAuthStateChanged(auth, user => {
    callback(!!user && user.email === ADMIN_EMAIL);
  });
}

/* ===== CRUD ===== */
export async function addData(col, data) {
  await addDoc(collection(db, col), data);
}

export async function deleteData(col, id) {
  await deleteDoc(doc(db, col, id));
}

/* ===== Video Link Normalizer ===== */
export function normalizeVideoLink(link) {
  if (!link) return "";

  if (link.includes("drive.google.com")) {
    const id = link.match(/\/d\/([^\/]+)/);
    if (id) return `https://drive.google.com/file/d/${id[1]}/preview`;
  }

  if (link.includes("youtube.com"))
    return link.replace("watch?v=", "embed/");

  if (link.includes("youtu.be"))
    return `https://www.youtube.com/embed/${link.split("/").pop()}`;

  return link;
}

