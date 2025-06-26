/**
 * Revenue Chart Component
 *
 * A line chart component that displays revenue trends over time using Recharts.
 * This component shows monthly revenue data with growth percentages and provides
 * interactive tooltips for detailed information.
 *
 * The chart is responsive and uses a consistent color scheme for business
 * data visualization.
 */

'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Revenue Data
 *
 * Sample revenue data showing monthly revenue figures and growth percentages
 * for a 12-month period. This data demonstrates the chart's capabilities
 * with realistic business metrics.
 */
const data = [
  { month: 'Jan', revenue: 1200000, growth: 0 },      // Starting point
  { month: 'Feb', revenue: 1350000, growth: 12.5 },   // Strong growth
  { month: 'Mar', revenue: 1420000, growth: 5.2 },    // Moderate growth
  { month: 'Apr', revenue: 1580000, growth: 11.3 },   // Strong growth
  { month: 'May', revenue: 1650000, growth: 4.4 },    // Steady growth
  { month: 'Jun', revenue: 1780000, growth: 7.9 },    // Good growth
  { month: 'Jul', revenue: 1850000, growth: 3.9 },    // Moderate growth
  { month: 'Aug', revenue: 1920000, growth: 3.8 },    // Steady growth
  { month: 'Sep', revenue: 2100000, growth: 9.4 },    // Strong growth
  { month: 'Oct', revenue: 2250000, growth: 7.1 },    // Good growth
  { month: 'Nov', revenue: 2380000, growth: 5.8 },    // Moderate growth
  { month: 'Dec', revenue: 2500000, growth: 5.0 },    // Year-end growth
];

/**
 * RevenueChart Component
 *
 * Renders a line chart displaying revenue trends over time. The chart includes:
 * - Monthly revenue data points
 * - Interactive tooltips with formatted values
 * - Responsive design for different screen sizes
 * - Grid lines for better readability
 *
 * @returns JSX.Element - The rendered revenue chart
 */
export default function RevenueChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* Grid lines for better data point alignment */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-axis showing months */}
          <XAxis dataKey="month" />

          {/* Y-axis for revenue values */}
          <YAxis />

          {/* Interactive tooltip with custom formatting */}
          <Tooltip
            formatter={(value, name) => [
              name === 'revenue' ? `$${(value as number).toLocaleString()}` : `${value}%`,
              name === 'revenue' ? 'Revenue' : 'Growth %'
            ]}
          />

          {/* Revenue line with custom styling */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"           // Purple color for revenue line
            strokeWidth={2}            // Line thickness
            dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}  // Data point styling
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}