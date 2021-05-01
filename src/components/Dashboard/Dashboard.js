/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchColumns, fetchData } from "../../api";
import Chart from "./Chart";
import Sidebar from "./Sidebar";
import DroppableContainer from "./DroppableContainer";

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
          <Sidebar
            data={data}
            handleGetData={handleGetData}
            onDragStart={onDragStart}
          />

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
                  <DroppableContainer
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    handleClear={handleClear}
                    dimension={dimension}
                    measures={measures}
                  />

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
