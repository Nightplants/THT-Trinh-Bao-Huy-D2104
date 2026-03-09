function addDream() {
  let name = document.getElementById("dreamName").value;
  let deadline = document.getElementById("dreamDeadline").value;
  let steps = document.getElementById("dreamSteps").value;

  if (name === "") {
    alert("Bạn chưa nhập tên ước mơ");
    return;
  }

  let dreams = JSON.parse(localStorage.getItem("dreams")) || [];

  let dream = {
    name: name,
    deadline: deadline,
    steps: steps,
  };

  dreams.push(dream);

  localStorage.setItem("dreams", JSON.stringify(dreams));

  document.getElementById("dreamName").value = "";
  document.getElementById("dreamDeadline").value = "";
  document.getElementById("dreamSteps").value = "";
}
