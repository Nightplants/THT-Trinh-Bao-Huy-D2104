function setAvatar(src) {
  localStorage.setItem("profile", "../Avatar/" + src);
  alert("Đã lưu profile");
  window.location.href = "../Home/index.html";
}
