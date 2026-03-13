import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAuex480J0Xcxvdj-nSCd61ZtgapNf3fXI",
  authDomain: "tht-trinh-bao-huy-d2104.firebaseapp.com",
  databaseURL: "https://tht-trinh-bao-huy-d2104-default-rtdb.firebaseio.com",
  projectId: "tht-trinh-bao-huy-d2104",
  storageBucket: "tht-trinh-bao-huy-d2104.firebasestorage.app",
  messagingSenderId: "267969297800",
  appId: "1:267969297800:web:9c68370e626f0cb2b3ce3d",
  measurementId: "G-V8E9HP76SX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

function addDream() {
  let name = document.getElementById("dreamName").value;
  let deadline = document.getElementById("dreamDeadline").value;
  let steps = document.getElementById("dreamSteps").value;

  if (name === "") {
    alert("Bạn chưa nhập tên ước mơ");
    return;
  }

  let userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Bạn chưa đăng nhập");
    return;
  }

  let dreamKey = name.replace(/\s+/g, "_");

  set(ref(db, "users/" + userId + "/dreams/" + dreamKey), {
    name: name,
    deadline: deadline,
    steps: steps,
  });

  alert("Đã lưu ước mơ!");

  document.getElementById("dreamName").value = "";
  document.getElementById("dreamDeadline").value = "";
  document.getElementById("dreamSteps").value = "";
}

window.addDream = addDream;