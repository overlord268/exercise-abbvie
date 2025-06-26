/**
 * Main Library Page Component
 *
 * This is the entry point for the Asset Library application. It serves as a dashboard
 * for managing and exploring business assets including KPIs, Layouts, Data Visualizations,
 * and Storyboards.
 *
 * The page renders the LibraryClient component with mock data that simulates a real
 * business intelligence environment with various asset types and their metadata.
 */

import LibraryClient from "@/app/components/LibraryClient";

/**
 * Mock Assets Data
 *
 * This array contains sample business assets that demonstrate the different types
 * of assets available in the library. Each asset has specific properties based on
 * its type (KPI, Layout, DataViz, Storyboard).
 *
 * Asset Types:
 * - KPI: Key Performance Indicators with business questions, calculations, and metrics
 * - Layout: Dashboard layouts that combine multiple KPIs
 * - DataViz: Interactive charts and visualizations
 * - Storyboard: Presentation-ready storyboards with filters and affiliate targeting
 */
const mockAssets = [
  // KPI Assets - Key Performance Indicators for business metrics
  {
    id: 1,
    name: "Revenue Growth",
    description: "Tracks the percentage increase in revenue over a period.",
    date: "06/27/2024",
    type: "KPI" as const,
    businessQuestions: [
      "How fast is our revenue growing?",
      "Are we meeting our quarterly targets?",
      "Which affiliates are driving growth?",
    ],
    metricIds: ["REV_GROWTH", "REV_YOY"],
    calculation: "(Current Period Revenue - Previous Period Revenue) / Previous Period Revenue * 100",
    visualsAvailable: ["Line Chart", "Bar Chart", "Table"],
    affiliateApplicability: "All Affiliates",
  },
  {
    id: 2,
    name: "Customer Acquisition Cost",
    description: "Measures the cost to acquire a new customer across marketing channels.",
    date: "06/28/2024",
    type: "KPI" as const,
    businessQuestions: [
      "What is our cost to acquire new customers?",
      "Which marketing channels are most efficient?",
      "How does CAC vary by customer segment?",
    ],
    metricIds: ["CAC", "CAC_BY_CHANNEL"],
    calculation: "Total Marketing Spend / Number of New Customers Acquired",
    visualsAvailable: ["Bar Chart", "Pie Chart", "Table"],
    affiliateApplicability: "Marketing Teams",
  },
  {
    id: 3,
    name: "Customer Lifetime Value",
    description: "Predicts the total value a customer will bring over their relationship.",
    date: "06/29/2024",
    type: "KPI" as const,
    businessQuestions: [
      "What is the long-term value of our customers?",
      "How does CLV vary by product category?",
      "Which customer segments are most valuable?",
    ],
    metricIds: ["CLV", "CLV_BY_SEGMENT"],
    calculation: "Average Purchase Value × Purchase Frequency × Customer Lifespan",
    visualsAvailable: ["Line Chart", "Bar Chart", "Heatmap"],
    affiliateApplicability: "All Affiliates",
  },
  {
    id: 4,
    name: "Conversion Rate",
    description: "Tracks the percentage of visitors who complete desired actions.",
    date: "06/30/2024",
    type: "KPI" as const,
    businessQuestions: [
      "What percentage of visitors convert?",
      "Which pages have the highest conversion rates?",
      "How do conversion rates vary by traffic source?",
    ],
    metricIds: ["CONV_RATE", "CONV_BY_PAGE"],
    calculation: "(Number of Conversions / Number of Visitors) × 100",
    visualsAvailable: ["Line Chart", "Funnel Chart", "Table"],
    affiliateApplicability: "E-commerce Teams",
  },

  // Layout Assets - Dashboard layouts that combine multiple KPIs
  {
    id: 5,
    name: "Executive Dashboard",
    description: "Comprehensive dashboard for executive reporting and decision making.",
    date: "06/27/2024",
    type: "Layout" as const,
    amountOfPages: 4,
    kpisBeingUsed: [1, 2, 3], // References to KPI asset IDs
  },
  {
    id: 6,
    name: "Marketing Performance Dashboard",
    description: "Focused dashboard for marketing team performance tracking.",
    date: "06/28/2024",
    type: "Layout" as const,
    amountOfPages: 3,
    kpisBeingUsed: [2, 4],
  },
  {
    id: 7,
    name: "Sales Operations Dashboard",
    description: "Sales team dashboard with pipeline and performance metrics.",
    date: "06/29/2024",
    type: "Layout" as const,
    amountOfPages: 5,
    kpisBeingUsed: [1, 3, 4],
  },
  {
    id: 8,
    name: "Customer Success Dashboard",
    description: "Customer success metrics and health score tracking.",
    date: "06/30/2024",
    type: "Layout" as const,
    amountOfPages: 2,
    kpisBeingUsed: [3, 4],
  },

  // Storyboard Assets - Presentation-ready storyboards with filters and targeting
  {
    id: 9,
    name: "Quarterly Performance Review",
    description: "Comprehensive storyboard for quarterly business reviews and presentations.",
    date: "06/27/2024",
    type: "Storyboard" as const,
    coupledKpisFilters: [
      "Revenue Growth Filter",
      "Regional Performance Filter",
      "Product Category Filter",
      "Time Period Filter"
    ],
    applicableAffiliates: [
      "North America",
      "Europe",
      "Asia Pacific",
      "Latin America"
    ],
  },
  {
    id: 10,
    name: "Marketing Campaign Analysis",
    description: "Storyboard for analyzing marketing campaign performance and ROI.",
    date: "06/28/2024",
    type: "Storyboard" as const,
    coupledKpisFilters: [
      "Campaign Type Filter",
      "Channel Performance Filter",
      "Audience Segment Filter",
      "Budget Allocation Filter"
    ],
    applicableAffiliates: [
      "Marketing Team",
      "Digital Marketing",
      "Brand Management"
    ],
  },
  {
    id: 11,
    name: "Product Launch Review",
    description: "Storyboard for product launch performance and market adoption analysis.",
    date: "06/29/2024",
    type: "Storyboard" as const,
    coupledKpisFilters: [
      "Product Category Filter",
      "Launch Date Filter",
      "Market Segment Filter",
      "Geographic Region Filter"
    ],
    applicableAffiliates: [
      "Product Management",
      "Sales Teams",
      "Customer Success"
    ],
  },
  {
    id: 12,
    name: "Customer Journey Analysis",
    description: "Storyboard for customer journey mapping and touchpoint optimization.",
    date: "06/30/2024",
    type: "Storyboard" as const,
    coupledKpisFilters: [
      "Customer Segment Filter",
      "Journey Stage Filter",
      "Touchpoint Type Filter",
      "Conversion Funnel Filter"
    ],
    applicableAffiliates: [
      "Customer Experience",
      "UX Design",
      "Customer Success"
    ],
  },

  // Data Visualization Assets - Interactive charts and visualizations
  {
    id: 13,
    name: "Revenue Dashboard",
    description: "Interactive chart showing revenue trends and KPIs.",
    date: "06/27/2024",
    type: "DataViz" as const,
    applicableKpis: [1, 2, 3], // References to KPI asset IDs
    assetInfoContext: "This visualization combines multiple revenue KPIs to provide a comprehensive view of business performance across all affiliates.",
    chartInteraction: "Click on data points to drill down into specific time periods. Hover for detailed tooltips. Use filters to adjust date ranges and affiliate selection.",
  },
  {
    id: 14,
    name: "Regional Performance Chart",
    description: "Bar chart visualization showing performance across different regions.",
    date: "06/27/2024",
    type: "DataViz" as const,
    applicableKpis: [1, 2],
    assetInfoContext: "Regional performance comparison chart showing revenue distribution and growth rates across different geographical areas.",
    chartInteraction: "Hover over bars to see detailed revenue figures. Click on regions to filter data for specific areas.",
  },
  {
    id: 15,
    name: "Product Distribution Analysis",
    description: "Pie chart showing market share distribution across product categories.",
    date: "06/27/2024",
    type: "DataViz" as const,
    applicableKpis: [1, 3],
    assetInfoContext: "Product category distribution analysis showing market share percentages and revenue contribution by product type.",
    chartInteraction: "Click on pie segments to see detailed breakdown. Hover for percentage and value information.",
  },
  {
    id: 16,
    name: "Customer Acquisition Funnel",
    description: "Funnel chart showing customer acquisition process and conversion rates.",
    date: "06/28/2024",
    type: "DataViz" as const,
    applicableKpis: [2, 4],
    assetInfoContext: "Customer acquisition funnel visualization showing conversion rates at each stage of the customer journey.",
    chartInteraction: "Click on funnel stages to see detailed metrics. Hover for conversion rate information.",
  },
  {
    id: 17,
    name: "Marketing Channel Performance",
    description: "Multi-series chart comparing performance across marketing channels.",
    date: "06/29/2024",
    type: "DataViz" as const,
    applicableKpis: [2, 4],
    assetInfoContext: "Marketing channel performance comparison showing CAC, conversion rates, and ROI across different channels.",
    chartInteraction: "Toggle between different metrics. Click on channels to see detailed performance data.",
  },
  {
    id: 18,
    name: "Customer Lifetime Value Trends",
    description: "Line chart showing CLV trends over time by customer segment.",
    date: "06/30/2024",
    type: "DataViz" as const,
    applicableKpis: [3, 4],
    assetInfoContext: "Customer lifetime value trends analysis showing how CLV changes over time across different customer segments.",
    chartInteraction: "Select different customer segments. Hover for detailed CLV values and growth rates.",
  },
];

/**
 * LibraryPage Component
 *
 * The main page component that renders the asset library interface.
 * It provides a responsive container and passes the mock assets data
 * to the LibraryClient component for rendering.
 *
 * @returns JSX.Element - The rendered library page
 */
export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <LibraryClient assets={mockAssets} />
      </div>
    </div>
  );
}
