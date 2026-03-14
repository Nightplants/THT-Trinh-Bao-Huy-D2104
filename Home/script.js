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

function goDreams() {
  window.location.href = "../Dreams/index.html";
}

function goAvatar() {
  window.location.href = "../Profile/index.html";
}

function goDreams() {
  window.location.href = "../Dreams/index.html";
}

function goAvatar() {
  window.location.href = "../Avatar/index.html";
}
