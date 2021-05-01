const API_URL = "https://plotter-task.herokuapp.com";
const DATA = "data";
const COLUMNS = "columns";

export const fetchColumns = async (key) => {
  let url = `${API_URL}/${COLUMNS}`;

  const res = await fetch(url);
  return await res.json();
}

export const fetchData = async (body) => {
  let url = `${API_URL}/${DATA}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return await res.json();
}
