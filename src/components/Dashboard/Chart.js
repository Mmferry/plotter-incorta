import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {},
};

const colorPicker = ["#08457c", "#1e81b0", "#e07b39"]

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
          backgroundColor: colorPicker[i-1],
          borderColor: colorPicker[i-1],
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
