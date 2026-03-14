import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getDatabase,
  ref,
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

function loadProfile() {
  let name = localStorage.getItem("username");
  let profile = localStorage.getItem("profile");

  if (name) {
    document.getElementById("username").innerText = name;
  }

  if (profile) {
    document.getElementById("profile").src = profile;
  }
}

function loadDreams() {

  let userId = localStorage.getItem("userId");

  get(ref(db, "users/" + userId + "/dreams")).then((snapshot) => {

    let container = document.getElementById("dreamContainer");
    container.innerHTML = "";

    let index = 0;

    snapshot.forEach((child) => {

      let dream = child.val();

      let steps = dream.steps ? dream.steps.split(",") : [];

      let html = `
      <div class="dream">

        <div class="dreamTitle" onclick="toggleSteps(${index})">
          ${dream.name}
          <span id="percent-${index}">0%</span>
        </div>

        <div class="steps" id="steps-${index}">
      `;

      steps.forEach(step => {

        html += `
        <label>
          <input type="checkbox" onchange="updateProgress(${index})">
          ${step}
        </label>
        `;

      });

      html += `
          <div class="progressBar">
            <div class="progress" id="bar-${index}"></div>
          </div>
        </div>

      </div>
      `;

      container.innerHTML += html;

      index++;

    });

  });

}

function toggleSteps(index) {

  let steps = document.getElementById("steps-" + index);

  if (steps.style.display === "block") {
    steps.style.display = "none";
  } else {
    steps.style.display = "block";
  }

}

function updateProgress(index) {

  let checkboxes = document.querySelectorAll(`#steps-${index} input`);

  let total = checkboxes.length;
  let done = 0;

  checkboxes.forEach(cb => {
    if (cb.checked) done++;
  });

  let percent = 0;

  if (total > 0) {
    percent = Math.round(done / total * 100);
  }

  document.getElementById("percent-" + index).innerText = percent + "%";

  document.getElementById("bar-" + index).style.width = percent + "%";

}

loadDreams();

window.loadProfile = loadProfile;
window.toggleSteps = toggleSteps;
window.updateProgress = updateProgress;