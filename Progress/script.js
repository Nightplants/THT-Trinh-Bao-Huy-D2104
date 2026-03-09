let dreams = JSON.parse(localStorage.getItem("dreams")) || [];

let container = document.getElementById("dreamContainer");

dreams.forEach((dream, index) => {
  let steps = dream.steps ? dream.steps.split(",") : [];

  let stepHTML = "";

  steps.forEach((step, i) => {
    stepHTML += `
<label>
<input type="checkbox" onchange="updateProgress(${index})">
${step}
</label>
`;
  });

  container.innerHTML += `

<div class="dream">

<div class="dreamTitle" onclick="toggleSteps(${index})">

${dream.name}

<span id="percent-${index}">0%</span>

</div>

<div class="steps" id="steps-${index}">

${stepHTML}

<div class="progressBar">

<div class="progress" id="bar-${index}"></div>

</div>

</div>

</div>

`;
});

function toggleSteps(index) {
  let steps = document.getElementById("steps-" + index);

  if (steps.style.display === "block") steps.style.display = "none";
  else steps.style.display = "block";
}

function updateProgress(index) {
  let checkboxes = document.querySelectorAll(`#steps-${index} input`);

  let total = checkboxes.length;
  let done = 0;

  checkboxes.forEach((cb) => {
    if (cb.checked) done++;
  });

  let percent = Math.round((done / total) * 100);

  document.getElementById("percent-" + index).innerText = percent + "%";

  document.getElementById("bar-" + index).style.width = percent + "%";
}
