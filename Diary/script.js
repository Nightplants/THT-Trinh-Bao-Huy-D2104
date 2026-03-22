import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get,
  push,
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
const db = getDatabase(app);

let userId = localStorage.getItem("userId");

// =======================
// LOAD DIARY
// =======================

window.loadDiary = async function () {
  if (!userId) return;

  const snapshot = await get(ref(db, "users/" + userId + "/diaries"));

  const list = document.getElementById("diaryList");
  list.innerHTML = "";

  if (snapshot.exists()) {
    const data = snapshot.val();

    let arr = [];

    for (let id in data) {
      arr.push({
        id: id,
        ...data[id],
      });
    }

    // sort mới nhất
    arr.sort((a, b) => b.time - a.time);

    // render
    arr.forEach((item) => {
      let div = document.createElement("div");
      div.className = "diary-item";

      let time = new Date(item.time).toLocaleString();

      div.innerHTML = `
<div class="diary-time">${time}</div>
<div class="diary-content">${item.content}</div>
`;

      list.appendChild(div);
    });
  }
};

// =======================
// ADD DIARY
// =======================

window.addDiary = async function () {
  let content = document.getElementById("diaryInput").value;

  if (!content) {
    alert("Nhập nội dung nhật ký");
    return;
  }

  let now = Date.now();

  let newRef = push(ref(db, "users/" + userId + "/diaries"));

  await set(newRef, {
    content: content,
    time: now,
  });

  document.getElementById("diaryInput").value = "";

  loadDiary();
};

// =======================
// ADD REMINDER (KHÔNG HIỂN THỊ)
// =======================

window.addReminder = async function () {
  let content = document.getElementById("reminderInput").value;
  let time = document.getElementById("reminderTime").value;

  if (!content || !time) {
    alert("Nhập đủ nội dung và thời gian");
    return;
  }

  let newRef = push(ref(db, "users/" + userId + "/reminders"));

  await set(newRef, {
    content: content,
    time: time,
  });

  alert("Đã lưu nhắc nhở");

  document.getElementById("reminderInput").value = "";
  document.getElementById("reminderTime").value = "";
};
