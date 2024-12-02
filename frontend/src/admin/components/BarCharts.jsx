import React from "react";
import {
  LineChart,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

const BarCharts = ({ title, data, xDataKey, barDatakey }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-left text-lg font-bold mb-4 text-primaryBlue">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xDataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={barDatakey} fill="#0cc0df" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
