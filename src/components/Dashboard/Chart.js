import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {},
};

function randomColor() {
  var num = Math.round(Math.random() * Math.pow(10, 7));
  // Converting number to hex string to be read as RGB
  var hexString = "#" + num.toString(16);

  return hexString;
}

const Chart = ({ payload }) => {
  const [data, setData] = useState();
  useEffect(() => {
    let datasets = [];
    if (payload) {
      for (let i = 1; i < payload.length; i++) {
        datasets.push({
          label: payload[i].name,
          data: payload[i].values,
          fill: false,
          backgroundColor: randomColor(),
          borderColor: randomColor(),
          yAxisID: payload[i].name,
        });
      }
    }

    setData({
      labels: payload[0].values,
      datasets: [...datasets],
    });
  }, [payload]);

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
