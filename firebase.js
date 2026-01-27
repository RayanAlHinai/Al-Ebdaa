import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKkCLzhzhK8qtmaOBXEGyNNMfPVkRJjjs",
  authDomain: "ebdaa-academy.firebaseapp.com",
  projectId: "ebdaa-academy",
  messagingSenderId: "1071796310983",
  appId: "1:1071796310983:web:6d84c637f3b8df4e577fe2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// قراءة بيانات
export async function getCollectionData(name) {
  const snap = await getDocs(collection(db, name));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// إضافة
export async function addData(name, data) {
  await addDoc(collection(db, name), data);
}

// حذف
export async function deleteData(name, id) {
  await deleteDoc(doc(db, name, id));
}
