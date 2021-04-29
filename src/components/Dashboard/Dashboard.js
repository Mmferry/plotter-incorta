/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchColumns } from "../../api";

const Dashboard = () => {
  const { data, error, isLoading, isError } = useQuery("columns", fetchColumns);

  if (isError) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-indigo-400">Loading...</p>
    </div>
    )
  }

  const handleGetData = (funcType) => {

  }

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
                        className="group flex items-center px-2 py-2 text-sm font-medium text-black rounded-md hover:bg-indigo-300 hover:bg-opacity-75"
                        onClick={() => handleGetData(column.function)}
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
                  <input type="text" />
                  <div className="py-4">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
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
