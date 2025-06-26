/**
 * KPI Modal Component
 *
 * A specialized modal component that displays detailed information about KPI (Key Performance Indicator) assets.
 * This modal shows KPI-specific properties like business questions, metric IDs, calculations,
 * available visualizations, and affiliate applicability.
 *
 * The modal is controlled by the Zustand store and provides a focused view for KPI analysis
 * and understanding.
 */

import { useLibraryStore } from "../store/libraryStore";
import type { Asset } from "../store/libraryStore";

/**
 * KpiModal Component
 *
 * Renders a modal dialog specifically designed for displaying KPI asset details.
 * The modal shows comprehensive KPI information including business context,
 * technical specifications, and usage guidelines.
 *
 * @returns JSX.Element | null - The KPI modal component or null if no KPI asset is selected
 */
export default function KpiModal() {
  // Extract KPI modal state from Zustand store
  const { kpiModalAsset, setKpiModalAsset } = useLibraryStore();
  const asset = kpiModalAsset;

  // Early return if no KPI asset is selected
  if (!asset) return null;

  /**
   * Handle Backdrop Click
   *
   * Closes the KPI modal when clicking outside the modal content.
   * This provides an intuitive way to dismiss the modal.
   *
   * @param e - Mouse event from backdrop click
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setKpiModalAsset(null);
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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative" onClick={handleModalClick}>
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setKpiModalAsset(null)}>&times;</button>

        {/* KPI Header Section */}
        <div className="mb-4">
          <div className="text-2xl font-extrabold text-gray-900 mb-1">{asset.name}</div>
          <div className="text-sm text-gray-600 mb-2">KPI Details</div>
          <div className="text-gray-800 mb-4">{asset.description}</div>
        </div>

        {/* Business Questions Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Business Questions</div>
          <ul className="list-disc list-inside text-gray-700">
            {/* Display each business question as a list item */}
            {(asset.businessQuestions || []).map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>

        {/* Metric IDs Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Metric IDs</div>
          <div className="text-gray-700">{(asset.metricIds || []).join(", ") || '-'}</div>
        </div>

        {/* Calculation Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Calculation</div>
          <div className="text-gray-700">{asset.calculation || '-'}</div>
        </div>

        {/* Visuals Available Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Visuals Available</div>
          <div className="text-gray-700">{(asset.visualsAvailable || []).join(", ") || '-'}</div>
        </div>

        {/* Affiliate Applicability Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Affiliate Applicability</div>
          <div className="text-gray-700">{asset.affiliateApplicability || '-'}</div>
        </div>
      </div>
    </div>
  );
}