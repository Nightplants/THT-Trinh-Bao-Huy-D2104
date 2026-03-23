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
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let userId = localStorage.getItem("userId");

window.loadProfile = function () {
  let name = localStorage.getItem("username");
  let avatar = localStorage.getItem("avatar");

  if (name) {
    document.getElementById("username").innerText = name;
  }

  if (avatar) {
    document.getElementById("profile").src = avatar;
  }
};

window.loadDiary = async function () {
  const snapshot = await get(ref(db, "users/" + userId + "/diaries"));

  let list = document.getElementById("diaryList");
  list.innerHTML = "";

  if (snapshot.exists()) {
    let data = snapshot.val();
    let arr = [];

    for (let id in data) {
      arr.push(data[id]);
    }

    arr.sort((a, b) => b.time - a.time);

    arr.forEach((item) => {
      let div = document.createElement("div");
      div.className = "diary-item";

      let time = new Date(item.time).toLocaleString();

      div.innerHTML = `
        <div class="diary-time">${time}</div>
        <div>${item.content}</div>
      `;

      list.appendChild(div);
    });
  }
};

window.addDiary = async function () {
  let content = document.getElementById("diaryInput").value;

  if (!content) {
    alert("Nhập nội dung");
    return;
  }

  let newRef = push(ref(db, "users/" + userId + "/diaries"));

  await set(newRef, {
    content: content,
    time: Date.now(),
  });

  document.getElementById("diaryInput").value = "";

  loadDiary();
};

window.addReminder = async function () {
  let content = document.getElementById("reminderInput").value;
  let date = document.getElementById("reminderTime").value;

  if (!content || !date) {
    alert("Nhập nội dung và ngày");
    return;
  }

  let newRef = push(ref(db, "users/" + userId + "/reminders"));

  await set(newRef, {
    content: content,
    date: date,
    createdAt: Date.now(),
  });

  alert("Đã gửi thư cho tương lai!");

  document.getElementById("reminderInput").value = "";
  document.getElementById("reminderTime").value = "";
};

window.goProfile = function () {
  window.location.href = "../Profile/index.html";
};

window.toggleReminder = function () {
  let box = document.getElementById("reminderBox");

  if (box.style.display === "none") {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
};
