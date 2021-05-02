import { rest } from 'msw';
import { setupServer } from "msw/node";
import { fetchColumns, fetchData } from "./api";
import ColumnsResponse from "./mock/columns.mock.json";
import DataResponse from "./mock/data.mock.json";

const API_URL = "https://plotter-task.herokuapp.com";
const DATA = "data";
const COLUMNS = "columns";

const server = setupServer(
  rest.get(`${API_URL}/${COLUMNS}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ...ColumnsResponse }));
  })
)

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it("Get columns correctly", async () => {
  const data = await fetchColumns();

  expect(data).toEqual({ ...ColumnsResponse });
});

it("handles COLUMNS service failure", async () => {
  server.use(
    rest.get(`${API_URL}/${COLUMNS}`, (_req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  await expect(fetchColumns()).rejects.toThrow("Something went wrong");
});

it("Get plotter data correctly", async () => {
  const payload = {
    "measures": ["Cost"],
    "dimension": "Product"
  }
  const data = await fetchData(payload);

  expect(data).toEqual([ ...DataResponse ])
});

it("handles DATA service failure", async () => {
  server.use(
    rest.post(`${API_URL}/${DATA}`, (_req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  await expect(fetchData({})).rejects.toThrow("Something went wrong");
});