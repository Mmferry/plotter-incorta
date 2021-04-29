const API_URL = "https://plotter-task.herokuapp.com";
const DATA = "data";
const COLUMNS = "columns";

export const fetchColumns = (key) => {
  let url = `${API_URL}/${COLUMNS}`;

  return fetch(url).then(res => res.json());
}

const testBody = {
  "measures": ["Cost"],
  "dimension": "Product"
}

export const fetchData = (key, body) => {
  let url = `${API_URL}/${DATA}`;

  return fetch(url,  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testBody)
  }).then(res => res.json());
}