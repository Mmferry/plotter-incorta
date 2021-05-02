import { mount, shallow } from "enzyme";
import renderer from 'react-test-renderer';
import Sidebar from "../Sidebar";
import Dashboard from "../Dashboard";
import DroppableContainer from "../DroppableContainer";
import ColumnsResponse from "../../../mock/columns.mock.json";

describe("<Dashboard /> component:", () => {
    const { columns } = ColumnsResponse;
    const measures = ["Cost"];
    let wrapper;
    let dropContainer;
    const props = {
      onDragStart: jest.fn(),
      onDragOver: jest.fn(),
      onDrop: jest.fn(),
      handleClear: jest.fn(),
    };

    beforeEach(() => {
      wrapper = shallow(<Sidebar data={columns} {...props} />);
      dropContainer = shallow( <DroppableContainer measures={measures} {...props} />);
    });

    // it('renders correctly', () => {
    //   const tree = renderer
    //     .create(<Dashboard />)
    //     .toJSON();
    //   expect(tree).toMatchSnapshot();
    // });

    describe("Interaction:", () => {
      describe("<Sidebar /> component:", () => {
        it("should call dragStart()", () => {
          wrapper.find(".draggable").at(1).simulate("dragStart");
          expect(props.onDragStart).toHaveBeenCalled();
        });
      });
      describe("<DroppableContainer /> component:", () => {
      it("should call onDrop()", () => {
        dropContainer.find("div.droppable").at(1).simulate("drop");
        expect(props.onDrop).toHaveBeenCalled();
      });
    });
  });
});
