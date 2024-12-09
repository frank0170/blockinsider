import { Line } from "react-chartjs-2";

const BitcoinDominanceChart = ({ dataPoints }) => {
  const data = {
    labels: dataPoints.map((point) =>
      new Date(point.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Bitcoin Dominance (%)",
        data: dataPoints.map((point) => point.bitcoin_dominance),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { display: true, title: { display: true, text: "Time" } },
      y: { display: true, title: { display: true, text: "Dominance (%)" } },
    },
  };

  return <Line data={data} options={options} />;
};

export default BitcoinDominanceChart;
