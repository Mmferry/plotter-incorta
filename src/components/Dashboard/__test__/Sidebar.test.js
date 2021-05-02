import { mount } from "enzyme";

import Sidebar from "../Sidebar";
import ColumnsResponse from "../../../mock/columns.mock.json";

describe("<Sidebar />", () => {
  const { columns } = ColumnsResponse;
  const wrapper = mount(<Sidebar data={columns} />);

  it("Renders list of columns", () => {
    expect(wrapper.find(".list").children()).toHaveLength(6);
  });

  it("link is dragable", () => {
    expect(wrapper.find('.draggable').at(1).prop('draggable')).toEqual(true);
  });
});
