const APIurl = "http://localhost:3000/";

const getToDoList = async () => {
  try {
    const response = await fetch(`${APIurl}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const Json = await response.json();
    return Json;
  } catch (err) {
    return err;
  }
};

const postTodoItem = async (data) => {
  try {
    const response = await fetch(`${APIurl}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    return err;
  }
};
