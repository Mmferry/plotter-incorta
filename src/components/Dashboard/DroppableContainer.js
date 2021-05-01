const DIMENSION = "dimension";
const MEASURE = "measure";

const DroppableContainer = ({
  onDragOver,
  onDrop,
  handleClear,
  dimension,
  measures,
}) => {
  return (
    <div>
      <div className="droppable-container">
        <span className="droppable-containe_type p-1">Dimension</span>
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
        <span className="droppable-containe_type p-1">Measures</span>
        <div
          className="droppable flex shadow-sm bg-white p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "measure")}
        >
          {measures.map((measure) => (
            <span key={measure} className="item">
              {measure}
            </span>
          ))}
        </div>
        <button
          onClick={() => handleClear(MEASURE)}
          className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          clear
        </button>
      </div>
    </div>
  );
};

export default DroppableContainer;
