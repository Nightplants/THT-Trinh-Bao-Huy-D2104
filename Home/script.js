function loadProfile() {
  let name = localStorage.getItem("name");
  let avatar = localStorage.getItem("avatar");

  if (name) {
    document.getElementById("name").innerText = name;
  }

  if (avatar) {
    document.getElementById("avatar").src = avatar;
  }
}

function goDreams() {
  window.location.href = "../Dreams/dreams.html";
}

function goAvatar() {
  window.location.href = "../Avatar/avatar.html";
}
