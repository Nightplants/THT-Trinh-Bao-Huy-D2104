import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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
const database = getDatabase(app);
const auth = getAuth();

window.login = function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let msg = document.getElementById("msg");

  if (email === "" || password === "") {
    msg.style.color = "red";
    msg.innerText = "Vui lòng nhập đầy đủ thông tin";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      msg.style.color = "green";
      msg.innerText = "Đăng nhập thành công!";

      setTimeout(() => {
        window.location.href = "home.html";
      }, 1000);
    })
    .catch((error) => {
      msg.style.color = "red";

      if (error.code === "auth/user-not-found") {
        msg.innerText =
          "Không tìm thấy tài khoản. Đang chuyển sang trang đăng ký...";

        setTimeout(() => {
          window.location.href = "../Cre_acc/index.html";
        }, 2000);
      } else if (error.code === "auth/wrong-password") {
        msg.innerText = "Sai mật khẩu";
      } else if (error.code === "auth/invalid-email") {
        msg.innerText = "Email không hợp lệ";
      } else {
        msg.innerText = "Đăng nhập thất bại";
      }
    });
};

window.togglePassword = function(){
    let pass = document.getElementById("password");

    if(pass.type === "password"){
        pass.type = "text";
    }else{
        pass.type = "password";
    }
}