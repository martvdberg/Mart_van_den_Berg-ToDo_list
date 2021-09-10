// Functions to add, delete or update a task in the database
const addTask = async () => {
  const inputText = findInputValue();
  if (inputText === "") {
    return;
  } else {
    const taskObj = { task: inputText, done: false };
    await postToDoItem(taskObj);
    buildDom();
  }
};

const deleteTask = async (index) => {
  const fullTask = await findTaskID(index);
  await deleteToDoItem(fullTask._id);
  buildDom();
};

const updateTask = async (item, index) => {
  const fullTask = await findTaskID(index);
  let update = {};
  switch (item.type) {
    case "checkbox":
      switch (fullTask.done) {
        case false:
          update = { task: fullTask.task, done: true };
          break;
        case true:
          update = { task: fullTask.task, done: false };
      }
      break;
    case "text":
      update = { task: item.value, done: fullTask.done };
      break;
  }
  await putToDoItem(fullTask._id, update);
  buildDom();
};

// find task ID
const findTaskID = async (index) => {
  const allTasks = await getToDoList();
  const task = allTasks[index];
  return task;
};

// Create complete li element for a task
const createCompleteLi = (task) => {
  const newLi = document.createElement("li");
  const newCheckbox = document.createElement("input");
  const newTextElement = document.createElement("input");
  const newWastebin = document.createElement("img");

  // set classes, inner values and attributes
  newLi.classList.add("list__item");
  newCheckbox.classList.add("list__item--checkbox");
  newTextElement.classList.add("list__item--taskValue");
  newWastebin.classList.add("list__item--wastebin");
  newCheckbox.setAttribute("type", "checkbox");
  newTextElement.setAttribute("type", "text");
  newWastebin.setAttribute("src", "./img/wastebin.png");

  if (task.done === true) {
    newCheckbox.checked = true;
    newTextElement.classList.add("checked");
  }
  newTextElement.value = task.task;

  // build the complete li
  newLi.appendChild(newCheckbox);
  newLi.appendChild(newTextElement);
  newLi.appendChild(newWastebin);
  return newLi;
};

// Function to build the DOM with all the tasks in the database
const buildDom = async () => {
  const allTasks = await getToDoList();
  const list = document.querySelector("#list");
  list.innerHTML = "";

  allTasks.forEach((task) => {
    list.appendChild(createCompleteLi(task));
  });
  // add eventlistners to the checkboxes the text fields and the wastebins
  EventlistnerForListItems();
};

// Add eventlistners for all the checkboxes, text fields and wastebins
const EventlistnerForListItems = () => {
  Array.from(document.querySelectorAll(".list__item--checkbox")).forEach(
    (checkbox, index) => {
      checkbox.addEventListener("change", () => {
        updateTask(checkbox, index);
      });
    }
  );

  Array.from(document.querySelectorAll(".list__item--taskValue")).forEach(
    (task, index) => {
      task.addEventListener("click", () => {
        // add an extra eventlistner for when the input is enter to submit or escape to exit
        task.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            updateTask(task, index);
          } else if (event.key === "Escape") {
            buildDom();
          }
        });
      });
    }
  );

  Array.from(document.querySelectorAll(".list__item--wastebin")).forEach(
    (wastebin, index) => {
      wastebin.addEventListener("click", () => {
        deleteTask(index);
      });
    }
  );
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
