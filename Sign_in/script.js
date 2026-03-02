import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  child,
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

function validEmail(email) {
  return email.includes("@") && email.includes(".com");
}

function validPassword(password) {
  let lengthValid = password.length > 8 && password.length < 30;
  let hasLetter = /[a-zA-Z]/.test(password);
  let hasNumber = /[0-9]/.test(password);
  let hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return lengthValid && hasLetter && hasNumber && hasSpecial;
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

window.login = function () {
  let input = document.getElementById("loginInput").value;
  let password = document.getElementById("password").value;

  if (!validPassword(password)) {
    alert("Mật khẩu không hợp lệ!");
    return;
  }

  if (input.includes("@")) {
    if (!validEmail(input)) {
      alert("Email phải chứa @ và .com");
      return;
    }

    signInWithEmailAndPassword(auth, input, password)
      .then(() => alert("Đăng nhập thành công!"))
      .catch(() => alert("Sai thông tin!"));
  } else {
    const dbRef = ref(db);

    get(child(dbRef, "users")).then((snapshot) => {
      if (snapshot.exists()) {
        let users = snapshot.val();
        let foundEmail = null;

        for (let uid in users) {
          if (users[uid].username === input) {
            foundEmail = users[uid].email;
          }
        }

        if (foundEmail) {
          signInWithEmailAndPassword(auth, foundEmail, password)
            .then(() => alert("Đăng nhập thành công!"))
            .catch(() => alert("Sai mật khẩu!"));
        } else {
          alert("Không tìm thấy tài khoản!");
          window.location.href = "../Sign_up/index.html";
        }
      }
    });
  }
};

window.togglePass = function (id) {
  let input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
};
