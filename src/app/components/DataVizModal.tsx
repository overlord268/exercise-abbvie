/**
 * Data Visualization Modal Component
 *
 * A specialized modal component that displays detailed information about Data Visualization assets.
 * This modal shows interactive charts, applicable KPIs, context information, and interaction
 * instructions for data visualizations.
 *
 * The modal includes dynamic chart rendering based on asset type and provides a comprehensive
 * view for data analysis and exploration.
 */

import { useLibraryStore } from "../store/libraryStore";
import type { Asset } from "../store/libraryStore";
import RevenueChart from "./charts/RevenueChart";
import RegionalBarChart from "./charts/BarChart";
import ProductPieChart from "./charts/PieChart";

/**
 * DataVizModal Component
 *
 * Renders a modal dialog specifically designed for displaying Data Visualization asset details.
 * The modal shows interactive charts, related KPIs, and provides context for data analysis.
 *
 * @returns JSX.Element | null - The DataViz modal component or null if no DataViz asset is selected
 */
export default function DataVizModal() {
  // Extract DataViz modal state and favorites from Zustand store
  const { dataVizModalAsset, setDataVizModalAsset, favorites } = useLibraryStore();
  const asset = dataVizModalAsset;

  // Early return if no DataViz asset is selected
  if (!asset) return null;

  /**
   * Get Chart Component
   *
   * Determines which chart component to render based on the asset name.
   * This provides dynamic chart selection for different types of data visualizations.
   *
   * @returns JSX.Element - The appropriate chart component
   */
  const getChartComponent = () => {
    if (asset.name.toLowerCase().includes('revenue')) {
      return <RevenueChart />;
    } else if (asset.name.toLowerCase().includes('regional')) {
      return <RegionalBarChart />;
    } else {
      return <ProductPieChart />;
    }
  };

  /**
   * Handle Backdrop Click
   *
   * Closes the DataViz modal when clicking outside the modal content.
   * This provides an intuitive way to dismiss the modal.
   *
   * @param e - Mouse event from backdrop click
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setDataVizModalAsset(null);
    }
  };

  /**
   * Handle Modal Content Click
   *
   * Prevents event bubbling when clicking inside the modal content
   * to avoid accidentally closing the modal.
   *
   * @param e - Mouse event from modal content click
   */
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={handleBackdropClick}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8 relative max-h-[90vh] overflow-y-auto" onClick={handleModalClick}>
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setDataVizModalAsset(null)}>&times;</button>

        {/* DataViz Header Section */}
        <div className="mb-4">
          <div className="text-2xl font-extrabold text-gray-900 mb-1">{asset.name}</div>
          <div className="text-sm text-gray-600 mb-2">Data Visualization Details</div>
          <div className="text-gray-800 mb-4">{asset.description}</div>
        </div>

        {/* Applicable KPIs Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Applicable KPI Favorites</div>
          <div className="text-gray-700">
            {asset.applicableKpis && asset.applicableKpis.length > 0 ? (
              <ul className="list-disc list-inside">
                {/* Display each applicable KPI with favorite status indicator */}
                {asset.applicableKpis.map((kpiId) => (
                  <li key={kpiId} className="flex items-center gap-2">
                    <span>KPI #{kpiId}</span>
                    {/* Show star icon if KPI is favorited */}
                    {favorites.includes(kpiId) && (
                      <span className="text-yellow-500">★</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500">No applicable KPIs</span>
            )}
          </div>
        </div>

        {/* Asset Info Context Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Asset Info Context</div>
          <div className="text-gray-700">
            {asset.assetInfoContext || 'No additional context available'}
          </div>
        </div>

        {/* Chart Interaction Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Interact with Chart</div>
          <div className="text-gray-700 mb-4">
            {asset.chartInteraction || 'No interaction details available'}
          </div>

          {/* Chart Preview Container */}
          <div className="p-4 bg-gray-50 rounded-lg border">
            <div className="text-sm text-gray-600 mb-4 font-semibold">Chart Preview</div>
            {/* Render the appropriate chart component based on asset type */}
            {getChartComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}