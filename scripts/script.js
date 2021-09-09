// Functions for adding, delete and change the task in the database
const addTask = async () => {
  const inputText = findInputValue();
  if (inputText === "") {
    return;
  } else {
    const toDoObj = { task: inputText, done: false };
    await postToDoItem(toDoObj);
    buildDom();
  }
};

const deleteTask = async (index) => {
  const fullTask = await findTaskID(index);
  await deleteToDoItem(fullTask._id);
  buildDom();
};

const updateTask = async (index) => {
  const fullTask = await findTaskID(index);

  let updatedTask = { task: fullTask.task, done: fullTask.done };
  if (fullTask.done === false) {
    updatedTask = { done: true };
  } else {
    updatedTask = { done: false };
  }
  await putToDoItem(fullTask._id, updatedTask);
  buildDom();
};

// find task ID
const findTaskID = async (index) => {
  const allTasks = await getToDoList();
  const task = allTasks[index];
  return task;
};

// Function to build the DOM with all the tasks in the database
const buildDom = async () => {
  const listOfTasks = await getToDoList();
  const list = document.querySelector("#list");
  list.innerHTML = "";

  listOfTasks.forEach((task) => {
    // create li and checkbox
    const newLi = document.createElement("li");
    const newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    const newTextElement = document.createElement("p");
    const newWastebin = document.createElement("img");

    // set inner vale and classes
    newTextElement.innerText = task.task;
    newWastebin.setAttribute("src", "./img/wastebin.png");

    // set the wastebin and checkbox value attribute to task value,makes it easy to use it to find the task ID
    // newWastebin.setAttribute("value", task.task);
    // newCheckbox.setAttribute("value", task.task);
    newWastebin.classList.add("wastebin");

    // check checkbox if task status is done
    if (task.done === true) {
      newCheckbox.checked = true;
    }

    // add li and checkbox and img to the list
    newLi.appendChild(newCheckbox);
    newLi.appendChild(newTextElement);
    newLi.appendChild(newWastebin);
    list.appendChild(newLi);
  });
  // add eventlistners to the wasteBins and checkboxes
  EventlistnerForListItems();
};

// Add eventlistners for all the chackboxes and wastebins
const EventlistnerForListItems = () => {
  const checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );
  const wasteBins = Array.from(document.querySelectorAll(".wastebin"));

  wasteBins.forEach((bin, index) => {
    bin.addEventListener("click", () => {
      deleteTask(index);
    });
  });

  checkboxes.forEach((box, index) => {
    box.addEventListener("change", () => {
      updateTask(index);
    });
  });
};

// Collect the value of the input field
const findInputValue = () => {
  const inputTextContainer = document.querySelector(".inputSection__text");
  const inputText = inputTextContainer.value;
  inputTextContainer.value = "";
  return inputText;
};

// Add eventlistner to the input text field and submit button
const addEventListenerForInput = () => {
  document
    .querySelector(".inputSection__text")
    .addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        addTask();
      }
    });

  document
    .querySelector(".inputSection__btn")
    .addEventListener("click", addTask);
};

// load eventlistners for inputfields and all the task that are already in the database when the page loads
addEventListenerForInput();
buildDom();
