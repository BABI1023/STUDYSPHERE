
function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (!task) return alert("Please enter something, babii 😘");

  const li = document.createElement("li");
  li.textContent = task;
  li.onclick = () => {
    li.style.textDecoration = "line-through";
    li.style.color = "gray";
  };
  document.getElementById("taskList").appendChild(li);

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
}

window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  for (let task of tasks) {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      li.style.textDecoration = "line-through";
      li.style.color = "gray";
    };
    document.getElementById("taskList").appendChild(li);
  }

  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    document.getElementById("notesArea").value = savedNotes;
  }

  const checkboxes = document.querySelectorAll(".dsa-check");
  checkboxes.forEach((box, i) => {
    box.checked = localStorage.getItem("dsa" + i) === "true";
    box.addEventListener("change", () => {
      localStorage.setItem("dsa" + i, box.checked);
      updateProgress();
    });
  });

  updateProgress();
};

document.getElementById("notesArea").addEventListener("input", () => {
  localStorage.setItem("notes", document.getElementById("notesArea").value);
});

function showQuote() {
  const quotes = [
    "You are unstoppable, babii 💗",
    "Google STEP is YOURS 💪✨",
    "You're stronger than your excuses 😘",
    "You’re a coding queen 👑",
    "Keep going — your dreams need you 🥺"
  ];
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quoteDisplay").textContent = quotes[random];
}

function updateProgress() {
  const checks = document.querySelectorAll(".dsa-check");
  const done = Array.from(checks).filter(box => box.checked).length;
  const percent = (done / checks.length) * 100;
  document.getElementById("progressFill").style.width = percent + "%";
}

let timer;
let timeLeft = 1500;

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up, babii! 🫶🏻");
      return;
    }
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent =
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 1500;
  document.getElementById("timer").textContent = "25:00";
}
