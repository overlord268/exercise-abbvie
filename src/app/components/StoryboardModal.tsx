/**
 * Storyboard Modal Component
 *
 * A specialized modal component that displays detailed information about Storyboard assets.
 * This modal shows storyboard-specific properties like coupled KPIs/filters, applicable
 * affiliates, and provides an access request form for storyboard permissions.
 *
 * The modal is controlled by the Zustand store and provides a focused view for
 * understanding storyboards and requesting access to them.
 */

import { useLibraryStore } from "../store/libraryStore";
import type { Asset } from "../store/libraryStore";

/**
 * StoryboardModal Component
 *
 * Renders a modal dialog specifically designed for displaying Storyboard asset details.
 * The modal shows comprehensive storyboard information including filters, affiliate
 * targeting, and provides an access request form for permissions.
 *
 * @returns JSX.Element | null - The Storyboard modal component or null if no Storyboard asset is selected
 */
export default function StoryboardModal() {
  // Extract Storyboard modal state from Zustand store
  const { storyboardModalAsset, setStoryboardModalAsset } = useLibraryStore();
  const asset = storyboardModalAsset;

  // Early return if no Storyboard asset is selected
  if (!asset) return null;

  /**
   * Handle Backdrop Click
   *
   * Closes the Storyboard modal when clicking outside the modal content.
   * This provides an intuitive way to dismiss the modal.
   *
   * @param e - Mouse event from backdrop click
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setStoryboardModalAsset(null);
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
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setStoryboardModalAsset(null)}>&times;</button>

        {/* Storyboard Header Section */}
        <div className="mb-4">
          <div className="text-2xl font-extrabold text-gray-900 mb-1">{asset.name}</div>
          <div className="text-sm text-gray-600 mb-2">Storyboard Details</div>
          <div className="text-gray-800 mb-4">{asset.description}</div>
        </div>

        {/* Coupled KPIs/Filters Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Coupled KPIs/Filters</div>
          <div className="text-gray-700">
            {asset.coupledKpisFilters && asset.coupledKpisFilters.length > 0 ? (
              <ul className="list-disc list-inside">
                {/* Display each coupled KPI or filter */}
                {asset.coupledKpisFilters.map((filter, i) => (
                  <li key={i}>{filter}</li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500">No coupled KPIs or filters</span>
            )}
          </div>
        </div>

        {/* Applicable Affiliates Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Applicable Affiliates</div>
          <div className="text-gray-700">
            {asset.applicableAffiliates && asset.applicableAffiliates.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {/* Display each applicable affiliate as a tag */}
                {asset.applicableAffiliates.map((affiliate, i) => (
                  <span key={i} className="bg-gray-200 text-xs px-2 py-1 rounded text-gray-800 font-semibold">
                    {affiliate}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-500">No applicable affiliates</span>
            )}
          </div>
        </div>

        {/* Access Request Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Request Access</div>
          <div className="text-gray-700 mb-3">
            Request access to this storyboard for your team or affiliate.
          </div>
          <div className="space-y-3">
            {/* Reason for Access Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Reason for access</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                rows={3}
                placeholder="Please explain why you need access to this storyboard..."
              />
            </div>

            {/* Team/Affiliate Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Team/Affiliate</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                placeholder="Enter your team or affiliate name"
              />
            </div>

            {/* Submit Request Button */}
            <button className="w-full bg-orange-600 text-white py-2 rounded-lg font-bold hover:bg-orange-700 transition">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}