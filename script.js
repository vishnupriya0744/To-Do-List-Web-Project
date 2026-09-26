const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { text: "Communication skill", done: false },
  { text: "YouTube tutorial", done: false },
  { text: "College works", done: false },
  { text: "Examination preparation", done: false },
  { text: "Learning C and C++", done: false }
];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("done");
    span.onclick = () => { task.done = !task.done; save(); render(); };

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = () => { tasks.splice(i, 1); save(); render(); };

    li.append(span, del);
    list.appendChild(li);
  });
}

function addTask() {
  const v = input.value.trim();
  if (!v) return;
  tasks.push({ text: v, done: false });
  save();
  render();
  input.value = "";
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

render();