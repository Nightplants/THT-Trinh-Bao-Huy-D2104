import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
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

  let avatar = localStorage.getItem("avatar");

  if (avatar) {
    document.getElementById("avatar").src = avatar;
  }
};

window.chooseImage = function () {
  document.getElementById("upload").click();
};

window.uploadImage = function (event) {
  let file = event.target.files[0];

  if (!file) return;

  let reader = new FileReader();

  reader.onload = function (e) {
    let img = e.target.result;

    document.getElementById("avatar").src = img;

    localStorage.setItem("avatar", img);
  };

  reader.readAsDataURL(file);
};
