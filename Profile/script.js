function setProfile() {
  localStorage.setItem("profile", "../Profile/profile.png");

  alert("Đã chọn ảnh profile");

  window.location.href = "../Home/index.html";
}
