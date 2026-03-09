function addDream() {
  let text = document.getElementById("dreamInput").value;

  if (text === "") {
    alert("Bạn chưa nhập ước mơ");
    return;
  }

  let dreams = JSON.parse(localStorage.getItem("dreams")) || [];

  dreams.push(text);

  localStorage.setItem("dreams", JSON.stringify(dreams));

  document.getElementById("dreamInput").value = "";

  showDreams();
}

function showDreams() {
  let dreams = JSON.parse(localStorage.getItem("dreams")) || [];

  let list = document.getElementById("dreamList");

  list.innerHTML = "";

  dreams.forEach((dream) => {
    let li = document.createElement("li");

    li.innerText = dream;

    list.appendChild(li);
  });
}

showDreams();
