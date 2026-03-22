import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  update,
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

function hideText(text) {
  if (!text) return "";

  if (text.length <= 4) return text;

  let first = text.substring(0, 4);

  let stars = "*".repeat(text.length - 4);

  return first + stars;
}

window.loadProfile = async function () {
  let userId = localStorage.getItem("userId");

  if (!userId) return;

  try {
    const snapshot = await get(ref(db, "users/" + userId));

    if (snapshot.exists()) {
      const data = snapshot.val();

      let email = data.email || "";
      let password = data.password || "";

      document.getElementById("emailText").innerText = hideText(email);

      document.getElementById("passText").innerText = hideText(password);
    }
  } catch (err) {
    console.log(err);
  }

  let username = localStorage.getItem("username") || "User";

  document.getElementById("nameText").innerText = username;
  document.getElementById("username").innerText = username;
};

window.changeUsername = async function () {
  let newName = prompt("Nhập username mới:");

  if (!newName) return;

  let userId = localStorage.getItem("userId");

  try {
    await update(ref(db, "users/" + userId), {
      username: newName,
    });

    localStorage.setItem("username", newName);

    document.getElementById("nameText").innerText = newName;
    document.getElementById("username").innerText = newName;

    alert("Đổi username thành công");
  } catch (err) {
    console.log(err);
    alert("Lỗi khi đổi username");
  }
};

window.changePassword = async function () {
  let newPass = prompt("Nhập mật khẩu mới:");

  if (!newPass) return;

  let userId = localStorage.getItem("userId");

  try {
    await update(ref(db, "users/" + userId), {
      password: newPass,
    });

    document.getElementById("passText").innerText = hideText(newPass);

    alert("Đổi mật khẩu thành công");
  } catch (err) {
    console.log(err);
    alert("Lỗi khi đổi mật khẩu");
  }
};

window.logout = function () {
  if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    window.location.href = "../Sign_in/index.html"; 
  }
};