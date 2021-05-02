// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

jest.mock('react-query', () => ({ 
  useQuery: () => ({ isLoading: false, isError: false, data: [], }),
  useMutation: () => ({ mutate: {}, isError: false, isLoading: false }),
  useQueryClient: () => null,
}));
