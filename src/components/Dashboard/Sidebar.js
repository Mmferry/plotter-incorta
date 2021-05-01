const Sidebar = ({ data, handleGetData, onDragStart}) => {
  return (
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
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  key={column.name}
                  href="#"
                  draggable
                  className="group cursor-move draggable flex items-center px-2 py-2 text-sm font-medium text-black rounded-md hover:bg-indigo-300 hover:bg-opacity-75"
                  onClick={() => handleGetData(column.function, column.name)}
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
  );
};

export default Sidebar;
