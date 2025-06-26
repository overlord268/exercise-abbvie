/**
 * Regional Bar Chart Component
 *
 * A bar chart component that displays regional revenue performance using Recharts.
 * This component shows revenue data across different geographical regions and provides
 * interactive tooltips for detailed information.
 *
 * The chart is responsive and uses a consistent color scheme for business
 * data visualization.
 */

'use client'

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Regional Revenue Data
 *
 * Sample regional revenue data showing performance across different geographical
 * areas. This data demonstrates the chart's capabilities with realistic
 * business metrics for regional analysis.
 */
const data = [
  { region: 'North America', revenue: 850000, growth: 8.2 },   // Highest revenue
  { region: 'Europe', revenue: 720000, growth: 6.8 },          // Second highest
  { region: 'Asia Pacific', revenue: 680000, growth: 12.4 },   // Highest growth
  { region: 'Latin America', revenue: 250000, growth: 15.7 },  // Emerging market
];

/**
 * RegionalBarChart Component
 *
 * Renders a bar chart displaying regional revenue performance. The chart includes:
 * - Regional revenue data as bars
 * - Interactive tooltips with formatted values
 * - Responsive design for different screen sizes
 * - Grid lines for better readability
 *
 * @returns JSX.Element - The rendered regional bar chart
 */
export default function RegionalBarChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          {/* Grid lines for better data point alignment */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-axis showing regions */}
          <XAxis dataKey="region" />

          {/* Y-axis for revenue values */}
          <YAxis />

          {/* Interactive tooltip with custom formatting */}
          <Tooltip
            formatter={(value, name) => [
              name === 'revenue' ? `$${(value as number).toLocaleString()}` : `${value}%`,
              name === 'revenue' ? 'Revenue' : 'Growth %'
            ]}
          />

          {/* Revenue bars with custom styling */}
          <Bar dataKey="revenue" fill="#82ca9d" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}