const API_URL = "https://plotter-task.herokuapp.com";
const DATA = "data";
const COLUMNS = "columns";

export const fetchColumns = async (key) => {
  let url = `${API_URL}/${COLUMNS}`;
  try {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Request faild with status code ${result.code}`);
    }
    return await result.json();
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

export const fetchData = async (body) => {
  let url = `${API_URL}/${DATA}`;
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!result.ok) {
      throw new Error(`Request faild with status code ${result.code}`);
    }

    return await result.json();
  } catch (err) {
    throw new Error("Something went wrong");
  }
};
