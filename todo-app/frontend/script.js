let tasks = document.getElementsByClassName("task");
tasks = [...tasks];

tasks.forEach((task) => {
  console.log(task);
  task.addEventListener("dragstart", (e) => {
    let selected = e.target;

    let doBox = document.getElementById("do");
    let progressBox = document.getElementById("progress");
    let reviewBox = document.getElementById("review");
    let finishBox = document.getElementById("finish");

    progressBox.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    progressBox.addEventListener("drop", (e) => {
      progressBox.appendChild(selected);
      selected = null;
    });

    doBox.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    doBox.addEventListener("drop", (e) => {
      doBox.appendChild(selected);
      selected = null;
    });

    reviewBox.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    reviewBox.addEventListener("drop", (e) => {
      reviewBox.appendChild(selected);
      selected = null;
    });

    finishBox.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    finishBox.addEventListener("drop", (e) => {
      finishBox.appendChild(selected);
      selected = null;
    });
  });
});

function createTask() {
  let formDiv = document.createElement("div");
  formDiv.className = "formDiv";
  formDiv.innerHTML = "<h1> adding Task </h1>";
  let label = document.createElement("label");
  label.setAttribute("for", "titleInput");
  label.innerText = "Title";
  let inputBox = document.createElement("input");
  inputBox.setAttribute("name", "titleInput");
  inputBox.setAttribute("type", "text");
  label.append(inputBox);
  formDiv.append(label);
  let label2 = document.createElement("label");
  label2.setAttribute("for", "contentInput");
  label2.innerText = "Content";
  inputBox = document.createElement("input");
  inputBox.setAttribute("name", "contentInput");
  inputBox.setAttribute("type", "text");
  label2.append(inputBox);
  formDiv.append(label2);
  let doBox = document.getElementById("do");
  doBox.append(formDiv);
}
