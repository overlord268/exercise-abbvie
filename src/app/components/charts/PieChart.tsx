/**
 * Product Distribution Pie Chart Component
 *
 * A pie chart component that displays product category distribution using Recharts.
 * This component shows market share percentages across different product categories
 * and provides interactive tooltips and legend for detailed information.
 *
 * The chart is responsive and uses a consistent color scheme for business
 * data visualization.
 */

'use client'

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

/**
 * Product Distribution Data
 *
 * Sample product category data showing market share percentages across
 * different business segments. This data demonstrates the chart's capabilities
 * with realistic business metrics for product analysis.
 */
const data = [
  { name: 'Software', value: 45, color: '#0088FE' },    // Largest segment
  { name: 'Hardware', value: 30, color: '#00C49F' },    // Second largest
  { name: 'Services', value: 15, color: '#FFBB28' },    // Medium segment
  { name: 'Consulting', value: 10, color: '#FF8042' },  // Smallest segment
];

/**
 * ProductPieChart Component
 *
 * Renders a pie chart displaying product category distribution. The chart includes:
 * - Product category segments as pie slices
 * - Interactive tooltips with percentage values
 * - Legend for category identification
 * - Responsive design for different screen sizes
 * - Custom labels showing category names and percentages
 *
 * @returns JSX.Element - The rendered product pie chart
 */
export default function ProductPieChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          {/* Main pie chart with custom configuration */}
          <Pie
            data={data}
            cx="50%"                    // Center X position
            cy="50%"                    // Center Y position
            labelLine={false}           // Disable label lines for cleaner look
            label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}  // Custom label format
            outerRadius={80}            // Chart size
            fill="#8884d8"              // Default fill color
            dataKey="value"             // Data key for values
          >
            {/* Individual pie slices with custom colors */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Interactive tooltip with custom formatting */}
          <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />

          {/* Legend for category identification */}
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}