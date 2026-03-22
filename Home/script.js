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

function goProfile() {
  window.location.href = "../Profile/index.html";
}

async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("Trình duyệt này không hỗ trợ thông báo.");
    return;
  }

  if (Notification.permission === "default") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Đã được cấp quyền!");
    }
  }
}