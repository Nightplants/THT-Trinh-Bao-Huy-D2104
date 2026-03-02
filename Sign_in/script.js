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
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

window.login = function () {
  let input = document.getElementById("loginInput").value;
  let password = document.getElementById("password").value;

  if (input.includes("@")) {
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
