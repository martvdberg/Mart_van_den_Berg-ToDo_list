const APIurl = "http://localhost:3000";

const getToDoList = async () => {
  try {
    const response = await fetch(`${APIurl}/`, {
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

const postToDoItem = async (bodyData) => {
  try {
    const response = await fetch(`${APIurl}/`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};

const putToDoItem = async (itemID, bodyData) => {
  try {
    const response = await fetch(`${APIurl}/${itemID}`, {
      method: "put",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const Json = await response.json();
  } catch (err) {
    return err;
  }
};

const deleteToDoItem = async (itemID) => {
  try {
    const response = await fetch(`${APIurl}/${itemID}`, {
      method: "delete",
      headers: {
        "Content-Type": "appplication/json",
      },
    });
    const Json = await response.json();
    return Json;
  } catch (err) {
    return err;
  }
};
