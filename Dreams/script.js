import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get
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

window.loadProfile = function () {
  let name = localStorage.getItem("username");
  let profile = localStorage.getItem("profile");

  if (name) {
    document.getElementById("username").innerText = name;
  }

  if (profile) {
    document.getElementById("profile").src = profile;
  }

  loadAllDreamsAndShowPopup();
};

window.addDream = function () {
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

  loadAllDreamsAndShowPopup();

  document.getElementById("dreamName").value = "";
  document.getElementById("dreamDeadline").value = "";
  document.getElementById("dreamSteps").value = "";
};

function calculateDaysLeft(deadline) {
  const today = new Date();
  const endDate = new Date(deadline);

  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

async function loadAllDreamsAndShowPopup() {
  let userId = localStorage.getItem("userId");

  if (!userId) return;

  try {
    const snapshot = await get(ref(db, "users/" + userId + "/dreams"));

    if (!snapshot.exists()) return;

    const dreams = snapshot.val();

    let text = "<b>📅 Thời gian còn lại của các ước mơ:</b><br><br>";

    for (let key in dreams) {
      let dream = dreams[key];
      let daysLeft = calculateDaysLeft(dream.deadline);

      if (daysLeft > 0) {
        text += `• ${dream.name}: còn <b>${daysLeft}</b> ngày<br>`;
      } else if (daysLeft === 0) {
        text += `• ${dream.name}: <b>Hôm nay là deadline!</b><br>`;
      } else {
        text += `• ${dream.name}: quá hạn <b>${Math.abs(daysLeft)}</b> ngày<br>`;
      }
    }

    document.getElementById("popupText").innerHTML = text;
    document.getElementById("deadlinePopup").style.display = "block";

  } catch (error) {
    console.error("Lỗi khi load dreams:", error);
  }
}

window.closePopup = function () {
  document.getElementById("deadlinePopup").style.display = "none";
};

window.goProfile = function () {
  window.location.href = "../Profile/index.html";
};