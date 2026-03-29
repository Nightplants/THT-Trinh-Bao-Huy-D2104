import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  remove,
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

function calculateDaysLeft(deadline) {
  const today = new Date();
  const endDate = new Date(deadline);

  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

async function notifyFull() {
  console.log("notifyFull running...");

  let userId = localStorage.getItem("userId");
  console.log("userId:", userId);

  if (!userId) return;

  let message = "";

  const dreamSnap = await get(ref(db, "users/" + userId + "/dreams"));

  if (dreamSnap.exists()) {
    const dreams = dreamSnap.val();

    for (let key in dreams) {
      let dream = dreams[key];
      let days = calculateDaysLeft(dream.deadline);

      if (days > 0) {
        message += `🎯 ${dream.name}: còn ${days} ngày\n`;
      }

      if (days === 0) {
        message += `🔥 ${dream.name}: hôm nay là deadline!\n`;
      }
    }
  }

  const letterSnap = await get(ref(db, "users/" + userId + "/reminders"));

  if (letterSnap.exists()) {
    let today = new Date().toISOString().split("T")[0];
    const letters = letterSnap.val();

    for (let id in letters) {
      let item = letters[id];

      if (item.date && item.date <= today) {
        message += `💌 Thư từ quá khứ:\n${item.content}\n\n`;
      }
    }
  }

  if (message !== "") {
    new Notification("FutureMe", {
      body: message,
    });
  }
}

window.loadProfile = async function () {
  let name = localStorage.getItem("username");
  let profile = localStorage.getItem("profile");

  if (name) {
    document.getElementById("username").innerText = name;
  }

  if (profile) {
    document.getElementById("profile").src = profile;
  }

  await notifyFull();
};

window.goProfile = function () {
  window.location.href = "../Profile/index.html";
};

window.goDreams = function () {
  window.location.href = "../Dreams/index.html";
};

window.addEventListener("load", async () => {
  if ("Notification" in window) {
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }

    await notifyFull();
  }
});