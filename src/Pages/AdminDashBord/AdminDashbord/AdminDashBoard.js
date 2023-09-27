import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer as ResponsiveContainerPie
} from "recharts";
import {
  ScatterChart,
  Scatter,
  XAxis as XAxisScatter,
  YAxis as YAxisScatter,
  ZAxis,
  Tooltip as TooltipScatter,
  Legend as LegendScatter,
  ResponsiveContainer as ResponsiveContainerScatter,
  CartesianGrid
} from "recharts";

const AdminDashBoard = () => {
  // Sample data
  const data = [
    { month: "Jan", sales: 1500, wins: 120 },
    { month: "Feb", sales: 2000, wins: 150 },
    { month: "Mar", sales: 1800, wins: 130 }
    // Add more data points as needed
  ];

  // Calculate totals
  const totalSales = data.reduce((total, entry) => total + entry.sales, 0);
  const totalWins = data.reduce((total, entry) => total + entry.wins, 0);

  // Pie chart data
  const pieChartData = [
    { name: "Property 1", value: 400 },
    { name: "Property 2", value: 300 },
    { name: "Property 3", value: 200 }
    // Add more data as needed
  ];

  // Colors for pie chart
  const pieChartColors = ["#8884d8", "#82ca9d", "#ffc658"];

  // Scatter chart data
  const scatterChartData = [
    { x: 1, y: 4, z: 100 },
    { x: 2, y: 3, z: 200 },
    { x: 3, y: 5, z: 150 },
    { x: 4, y: 2, z: 250 }
    // Add more data points as needed
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3>Total Sales</h3>
          <p>{totalSales}</p>
        </div>
        <div>
          <h3>Total Wins</h3>
          <p>{totalWins}</p>
        </div>
      </div>
      <div>
        <h3>Analytics Chart - Total Sales and Total Wins</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="sales"
              fill="#8884d8"
              name="Total Sales"
              animationDuration={800}
            />
            <Bar
              dataKey="wins"
              fill="#82ca9d"
              name="Total Wins"
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3>Property Distribution</h3>
        <ResponsiveContainerPie width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              animationBegin={400}
              animationDuration={800}
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieChartColors[index % pieChartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainerPie>
      </div>
      <div>
        <h3>Analytical Scatter Chart</h3>
        <ResponsiveContainerScatter width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxisScatter dataKey="x" type="number" name="X" />
            <YAxisScatter dataKey="y" type="number" name="Y" />
            <ZAxis dataKey="z" range={[50, 250]} name="Z" />
            <TooltipScatter cursor={{ strokeDasharray: "3 3" }} />
            <LegendScatter />
            <Scatter
              data={scatterChartData}
              fill="#8884d8"
              animationBegin={200}
              animationDuration={800}
            />
          </ScatterChart>
        </ResponsiveContainerScatter>
      </div>
    </div>
  );
};

export default AdminDashBoard;
