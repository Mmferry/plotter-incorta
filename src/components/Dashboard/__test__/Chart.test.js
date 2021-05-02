import { mount } from "enzyme";

import DataResponse from "../../../mock/data.mock.json";
import Chart from "../Chart";

describe('<Chart />', () => {
  it('Renders a Line chart', () => {
    const wrapper = mount(
      <Chart payload={DataResponse} />,
    )
    expect(wrapper).toMatchSnapshot()
  });
});