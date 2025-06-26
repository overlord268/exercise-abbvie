/**
 * Layout Modal Component
 *
 * A specialized modal component that displays detailed information about Layout assets.
 * This modal shows layout-specific properties like page count, KPIs being used,
 * and provides a visual preview of the dashboard layout structure.
 *
 * The modal is controlled by the Zustand store and provides a focused view for
 * understanding dashboard layouts and their composition.
 */

import { useLibraryStore } from "../store/libraryStore";
import type { Asset } from "../store/libraryStore";

/**
 * LayoutModal Component
 *
 * Renders a modal dialog specifically designed for displaying Layout asset details.
 * The modal shows comprehensive layout information including page structure,
 * associated KPIs, and visual preview of the dashboard layout.
 *
 * @returns JSX.Element | null - The Layout modal component or null if no Layout asset is selected
 */
export default function LayoutModal() {
  // Extract Layout modal state and favorites from Zustand store
  const { layoutModalAsset, setLayoutModalAsset, favorites } = useLibraryStore();
  const asset = layoutModalAsset;

  // Early return if no Layout asset is selected
  if (!asset) return null;

  /**
   * Handle Backdrop Click
   *
   * Closes the Layout modal when clicking outside the modal content.
   * This provides an intuitive way to dismiss the modal.
   *
   * @param e - Mouse event from backdrop click
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setLayoutModalAsset(null);
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
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setLayoutModalAsset(null)}>&times;</button>

        {/* Layout Header Section */}
        <div className="mb-4">
          <div className="text-2xl font-extrabold text-gray-900 mb-1">{asset.name}</div>
          <div className="text-sm text-gray-600 mb-2">Layout Details</div>
          <div className="text-gray-800 mb-4">{asset.description}</div>
        </div>

        {/* Amount of Pages Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Amount of Pages</div>
          <div className="text-gray-700">
            {asset.amountOfPages || 0} pages
          </div>
        </div>

        {/* KPIs Being Used Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">KPI's being used</div>
          <div className="text-gray-700">
            {asset.kpisBeingUsed && asset.kpisBeingUsed.length > 0 ? (
              <ul className="list-disc list-inside">
                {/* Display each KPI with favorite status indicator */}
                {asset.kpisBeingUsed.map((kpiId) => (
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
              <span className="text-gray-500">No KPIs being used</span>
            )}
          </div>
        </div>

        {/* Layout Preview Section */}
        <div className="mb-4">
          <div className="font-bold mb-1 text-gray-900">Preview Layout</div>
          <div className="mt-2 p-4 bg-gray-100 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Layout Preview</div>
            <div className="space-y-2">
              {/* Generate visual preview of layout pages */}
              {Array.from({ length: asset.amountOfPages || 1 }).map((_, i) => (
                <div key={i} className="w-full h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                  Page {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}