let taskList = [];
window.onload = () => {
  fetchTasks();
};

async function fetchTasks() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("/getTask", {
      methon: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      console.log();
      taskList = data.tasks;
      console.log(taskList);
      renderList();
    } else {
      throw new Error("Error fetchin task");
    }
  } catch (e) {
    console.log(e);
  }
}

function injectHtml(displayDiv, state) {
  displayDiv.innerHTML = taskList
    .filter((task) => task.state == state)
    .map(
      (task) =>
        `
      
      <div class="task" draggable="true">
      <div style="display:none;">${task._id}</div>
        <div class="up">
          <div class="taskTitle">${task.title}</div>
          <div class="taskDescription">${task.content}</div>
        </div>
        <div class="down">
          <div class="taskMeta">
            <div class="metaLeft">
              <div class="taskDifficulty" id="${task.difficulty}">${task.difficulty}</div>
              <div class="date">${task.date}</div>
            </div>
            <div class="metaRight">${task.time}</div>
          </div>
        </div> 
      </div>     
    `
    )
    .join("");

  const tasks = displayDiv.querySelectorAll(".task");
  tasks.forEach((task) => {
    task.addEventListener("dragstart", handleDragStart);
  });
}

function handleDragStart(e) {
  let selected = e.target;

  let doContainer = document.getElementById("do");
  let progressContainer = document.getElementById("progress");
  let reviewContainer = document.getElementById("review");
  let finishContainer = document.getElementById("finish");

  let doBox = document.getElementById("doBoxDisplayArea");
  let progressBox = document.getElementById("progressBoxDisplayArea");
  let reviewBox = document.getElementById("reviewBoxDisplayArea");
  let finishBox = document.getElementById("finishBoxDisplayArea");

  doContainer.addEventListener("dragover", (e) => e.preventDefault());
  doContainer.addEventListener("drop", (e) => {
    if (selected) {
      doBox.appendChild(selected);
      const id = selected.firstElementChild.innerText;
      updateState(id, "do");
    }

    selected = null;
  });

  progressContainer.addEventListener("dragover", (e) => e.preventDefault());
  progressContainer.addEventListener("drop", (e) => {
    if (selected) {
      doBox.appendChild(selected);
      const id = selected.firstElementChild.innerText;
      updateState(id, "progress");
    }
    selected = null;
  });

  reviewContainer.addEventListener("dragover", (e) => e.preventDefault());
  reviewContainer.addEventListener("drop", (e) => {
    if (selected) {
      doBox.appendChild(selected);
      const id = selected.firstElementChild.innerText;
      updateState(id, "review");
    }
    selected = null;
  });

  finishContainer.addEventListener("dragover", (e) => e.preventDefault());
  finishContainer.addEventListener("drop", (e) => {
    if (selected) {
      doBox.appendChild(selected);
      const id = selected.firstElementChild.innerText;
      updateState(id, "finish");
    }
    selected = null;
  });
}
function showSavedNotification() {
  const notification = document.getElementById("savedNotification");

  // Make the notification visible
  notification.classList.add("visible");

  // Hide it after 3 seconds
  setTimeout(() => {
    notification.classList.remove("visible");
  }, 2000); // 2000ms = 3 seconds
}
function renderList() {
  let doBoxDisplayDiv = document.getElementById("doBoxDisplayArea");
  let progressBoxDisplayDiv = document.getElementById("progressBoxDisplayArea");
  let reviewBoxDisplayDiv = document.getElementById("reviewBoxDisplayArea");
  let finishBoxDisplayDiv = document.getElementById("finishBoxDisplayArea");
  doBoxDisplayDiv.innerHTML = "";
  progressBoxDisplayDiv.innerHTML = "";
  reviewBoxDisplayDiv.innerHTML = "";
  finishBoxDisplayDiv.innerHTML = "";

  injectHtml(doBoxDisplayDiv, "do");
  injectHtml(progressBoxDisplayDiv, "progress");
  injectHtml(reviewBoxDisplayDiv, "review");
  injectHtml(finishBoxDisplayDiv, "finish");
}

async function sendToBackend(task) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ task }),
    });
    if (response.ok) {
      let data = await response.json();
      console.log(data);
    } else {
      throw new Error("Error while saving data");
    }
  } catch (e) {
    console.log(e);
  }
}

async function handleSave(event) {
  let title = event.target[0].value;
  let content = event.target[1].value;
  let difficulty = event.target[2].value;
  let newTask = {
    title: title,
    content: content,
    difficulty: difficulty,
    state: "do",
  };
  const date = giveDate();
  newTask.date = date;
  newTask.time = getCurrentTimeInIST();

  await sendToBackend(newTask);
  fetchTasks();

  showSavedNotification();

  let formDiv = document.getElementsByClassName("formDiv")[0];
  let box = document.getElementById("do");
  box.removeChild(formDiv);
}

function getCurrentTimeInIST() {
  const currentDate = new Date();

  // Convert to milliseconds and add 5 hours 30 minutes for IST (IST = UTC + 5:30)
  const offsetIST = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
  const istDate = new Date(
    currentDate.getTime() + offsetIST - currentDate.getTimezoneOffset() * 60000
  );

  // Get hours, minutes, and seconds
  let hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const seconds = istDate.getSeconds();

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // If hour is 0, set it to 12 (midnight)

  // Add leading zeros to minutes and seconds if needed
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return formattedTime;
}

function giveDate() {
  // Create a new Date object
  const currentDate = new Date();

  // Get the day, month (name), and year
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month name (months are zero-indexed, so use getMonth())
  const month = monthNames[currentDate.getMonth()];

  // Format the date as "Month Day, Year"
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}

function createTask() {
  let formDiv = document.createElement("form");
  formDiv.className = "formDiv";
  formDiv.innerHTML = "<h1> Add Task </h1>";
  let label = document.createElement("label");
  label.setAttribute("for", "titleInput");
  label.innerText = "Title";
  let inputBox = document.createElement("input");
  inputBox.setAttribute("autocomplete", "off");
  inputBox.setAttribute("id", "titleInput");
  inputBox.setAttribute("name", "titleInput");
  inputBox.setAttribute("type", "text");

  let div1 = document.createElement("div");
  div1.append(label);
  div1.append(inputBox);
  div1.className = "tcd";
  formDiv.append(div1);

  let label2 = document.createElement("label");
  label2.setAttribute("for", "contentInput");
  label2.innerText = "Content";
  inputBox = document.createElement("input");
  inputBox.setAttribute("autocomplete", "off");
  inputBox.setAttribute("id", "contentInput");
  inputBox.setAttribute("name", "contentInput");
  inputBox.setAttribute("type", "text");

  let div2 = document.createElement("div");
  div2.append(label2);
  div2.append(inputBox);
  div2.className = "tcd";
  formDiv.append(div2);

  let label3 = document.createElement("label");
  label3.setAttribute("for", "difficultyInput");
  label3.innerText = "Difficulty";
  let select = document.createElement("select");
  select.setAttribute("name", "difficultyInput");
  select.setAttribute("id", "difficultyInput");
  select.innerHTML =
    "<option value='low'>Low</option><option value='medium'>Medium</option><option value='urgent'>Urgent</option>";

  let div3 = document.createElement("div");
  div3.append(label3);
  div3.append(select);
  div3.className = "tcd";
  formDiv.append(div3);

  let div4 = document.createElement("div");
  let submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Save");
  submitButton.className = "save";
  div4.append(submitButton);
  div4.className = "saveDiv";
  formDiv.append(div4);

  formDiv.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSave(event);
  });

  let doBox = document.getElementById("do");
  doBox.append(formDiv);
}
