const collectTasks = async () => {
  const jsonResponse = await getToDoList();
  console.log(jsonResponse);
  return jsonResponse;
};

const findInputValue = () => {
  const inputTextContainer = document.querySelector(".inputSection__text");
  const inputText = inputTextContainer.value;
  inputTextContainer.value = "";
  return inputText;
};

const createTaskObj = (inputText) => {
  return { task: inputText, done: false };
};

const addTask = async () => {
  const inputText = findInputValue();
  const toDoObj = createTaskObj(inputText);
  const postResponse = await postTodoItem(toDoObj);
  collectTasks();
};

// add eventlistner to submit button
const addBtn = document.querySelector(".inputSection__btn");
addBtn.addEventListener("click", addTask);

// load all the task that are already in the database when the page loads
collectTasks();
