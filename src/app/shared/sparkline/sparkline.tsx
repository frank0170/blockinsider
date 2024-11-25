import { LineChart, Line } from "recharts";

const Sparkline = ({ data }: any) => {
  return (
    <LineChart
      width={300}
      height={120}
      data={data.map((value: any, index: number) => ({ index, value }))}
    >
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  );
};

export default Sparkline;
