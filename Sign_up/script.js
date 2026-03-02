import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
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
const auth = getAuth(app);
const db = getDatabase(app);

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

window.register = function () {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const repassword = document.getElementById("confirmPassword").value;

  if (!email.includes("@") || !email.includes(".com")) {
    alert("Email phải có @ và .com");
    return;
  }

  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,30}$/;

  if (!passRegex.test(password)) {
    alert("Password phải có chữ, số, ký tự đặc biệt và 8-30 ký tự");
    return;
  }

  if (password !== repassword) {
    alert("Mật khẩu nhập lại không khớp");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      set(ref(db, "users/" + user.uid), {
        username: username,
        email: email,
        password: password,
      }).then(() => {
        alert("Đăng ký thành công!");
        window.location.href = "../Sign_in/index.html";
      });
    })
    .catch((error) => {
      alert(error.message);
    });
};

window.togglePass = function (id) {
  let input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
};
