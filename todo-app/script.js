let cnt = 1;
function handleDelete(e) {
  console.log(e);
  const parent = e.parentElement;
  if (parent) {
    parent.remove();
  }
}

function addTodo() {
  const input = document.getElementById("item");
  const parentDiv = document.createElement("div");
  parentDiv.style =
    "display: flex; justify-content: center; margin-bottom: 80px";
  const ptag = document.createElement("p");
  ptag.style = "font-size: 1.25rem; font-weight: 400; margin: 12px";
  ptag.innerHTML = `${cnt}. ${input.value}`;
  const innerDiv = document.createElement("div");

  //   innerDiv.class = "delete-button";
  innerDiv.classList.add("delete-button");
  //   innerDiv.onclick = "handleDelete()";
  innerDiv.onclick = function () {
    handleDelete(this);
  };
  const innerP = document.createElement("p");
  innerP.innerHTML = "Delete";
  innerDiv.appendChild(innerP);
  parentDiv.appendChild(ptag);
  parentDiv.appendChild(innerDiv);
  console.log(parentDiv);

  const topush = document.getElementById("todo-list");
  topush.appendChild(parentDiv);
  cnt++;
}
