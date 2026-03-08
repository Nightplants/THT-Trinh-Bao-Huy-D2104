function loadProfile() {
  let name = localStorage.getItem("name");
  let profile = localStorage.getItem("profile");

  if (name) {
    document.getElementById("name").innerText = name;
  }

  if (profile) {
    document.getElementById("profile").src = profile;
  }
}

function goDreams() {
  window.location.href = "../Dreams/index.html";
}

function goAvatar() {
  window.location.href = "../Avatar/index.html";
}

function goDreams() {
  window.location.href = "../Dreams/index.html";
}

function goAvatar() {
  window.location.href = "../Avatar/index.html";
}
