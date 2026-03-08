function saveDream() {
  let text = document.getElementById("dream").value;

  if (text == "") {
    alert("Hãy nhập ước mơ");
    return;
  }

  let dreams = JSON.parse(localStorage.getItem("dreams") || "[]");

  dreams.push(text);

  localStorage.setItem("dreams", JSON.stringify(dreams));

  loadDreams();
}

function loadDreams() {
  let dreams = JSON.parse(localStorage.getItem("dreams") || "[]");

  let list = document.getElementById("list");

  list.innerHTML = "";

  dreams.forEach((d) => {
    let li = document.createElement("li");

    li.innerText = d;

    list.appendChild(li);
  });
}
