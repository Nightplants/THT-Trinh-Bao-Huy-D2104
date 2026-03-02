import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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
const database = getDatabase(app);
const auth = getAuth();

window.register = function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let repassword = document.getElementById("repassword").value;
  let msg = document.getElementById("msg");

  if (email === "" || password === "" || repassword === "") {
    msg.style.color = "red";
    msg.innerText = "Vui lòng nhập đầy đủ thông tin";
    return;
  }

  if (password !== repassword) {
    msg.style.color = "red";
    msg.innerText = "Mật khẩu nhập lại không khớp!";
    return;
  }

  if (password.length < 6) {
    msg.style.color = "red";
    msg.innerText = "Mật khẩu phải từ 6 ký tự trở lên";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      set(ref(database, "users/" + userCredential.user.uid), {
        email: email,
      });

      msg.style.color = "green";
      msg.innerText = "Tạo tài khoản thành công!";

      setTimeout(() => {
        window.location.href = "../Sign_in/index.html";
      }, 1000);
    })
    .catch((error) => {
      msg.style.color = "red";
      msg.innerText = "Email đã tồn tại hoặc không hợp lệ";
    });
};

window.togglePassword = function (id) {
  let input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
};
