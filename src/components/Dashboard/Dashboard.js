/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchColumns, fetchData } from "../../api";
import Chart from "./Chart";

const DIMENSION = "dimension";
const MEASURE = "measure";

const Dashboard = () => {
  const { data, error, isLoading, isError } = useQuery("columns", fetchColumns);
  const [measures, setMeasures] = useState([]);
  const [dimension, setDimension] = useState("Product");
  const [response, setResponse] = useState();

  const queryClient = useQueryClient();
  const { mutate } = useMutation(fetchData, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["columns", { id: variables.id }], data);
      setResponse(data);
    },
  });

  useEffect(() => {
    if (dimension && measures.length) {
      mutate({
        measures: measures,
        dimension: dimension,
      });
    }
  }, [dimension, measures, mutate, setDimension, setMeasures]);

  if (isError) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-indigo-400">Loading...</p>
      </div>
    );
  }

  const handleGetData = (funcType, name) => {
    if (funcType === DIMENSION) {
      setDimension(name);
    } else if (funcType === MEASURE) {
      setMeasures([...measures, name]);
    }
  };

  const onDragStart = (ev, id, type) => {
    ev.dataTransfer.setData(type, id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, type) => {
    let name = ev.dataTransfer.getData(type);
    if (name !== "") handleGetData(type, name);
    return;
  };

  const handleClear = (funcType) => {
    if (funcType === DIMENSION) {
      setDimension("");
    } else if (funcType === MEASURE) {
      setMeasures([]);
    }
  };

  return (
    <section>
      <div className="bg-gray-100">
        <div className="h-screen flex overflow-hidden bg-gray-100">
          {/* Static sidebar for desktop */}
          <div className="hidden bg-indigo-200 md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex flex-col h-0 flex-1">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <div className="flex items-center flex-shrink-0 px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://www.incorta.com/hubfs/Incorta_2020/logos/incorta-logo.svg"
                      alt="Incorta"
                    />
                  </div>
                  <nav className="mt-5 flex-1 px-2 space-y-1">
                    {data.map((column) => (
                      <a
                        key={column.name}
                        href="#"
                        draggable
                        className="group cursor-move draggable flex items-center px-2 py-2 text-sm font-medium text-black rounded-md hover:bg-indigo-300 hover:bg-opacity-75"
                        onClick={() =>
                          handleGetData(column.function, column.name)
                        }
                        onDragStart={(e) =>
                          onDragStart(e, column.name, column.function)
                        }
                      >
                        {column.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-0 flex-1 overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Plotter
                  </h1>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  {/* Replace with your content */}
                  <div className="droppable-container">
                    <span className="droppable-containe_type p-1">
                      Dimension
                    </span>
                    <div
                      className="droppable flex shadow-sm bg-white p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      onDragOver={(e) => onDragOver(e)}
                      onDrop={(e) => onDrop(e, "dimension")}
                    >
                      {dimension ? <span className="item">{dimension}</span> : ""}
                    </div>
                    <button
                      onClick={() => handleClear(DIMENSION)}
                      className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      clear
                    </button>
                  </div>
                  <div className="droppable-container">
                    <span className="droppable-containe_type p-1">
                      Measures
                    </span>
                    <div
                      className="droppable flex shadow-sm bg-white p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      onDragOver={(e) => onDragOver(e)}
                      onDrop={(e) => onDrop(e, "measure")}
                    >
                      {measures.map((measure)=> <span key={measure} className="item">{measure}</span>)}
                    </div>
                    <button
                      onClick={() => handleClear(MEASURE)}
                      className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      clear
                    </button>
                  </div>

                  <div className="py-4">
                    {response ? (
                      <Chart payload={response} />
                    ) : (
                      <p>
                        You should first select anyone or all of those options (
                        Cost - Revenue - Units Sold )
                      </p>
                    )}
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
