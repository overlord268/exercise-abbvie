/**
 * Asset Modal Component
 *
 * A generic modal component that displays basic asset information and provides
 * navigation to type-specific detailed modals. This modal serves as an intermediate
 * view that shows common asset properties and allows users to access specialized
 * views for different asset types.
 *
 * The modal includes features like:
 * - Asset overview with metadata
 * - Favorite toggling
 * - Link copying
 * - Navigation to type-specific modals
 * - Click outside to close functionality
 */

import type { Asset } from "../store/libraryStore";
import { useLibraryStore } from "../store/libraryStore";

/**
 * Asset Modal Props Interface
 *
 * Defines the props required by the AssetModal component.
 */
type AssetModalProps = {
  open: boolean;                    // Whether the modal is visible
  onClose: () => void;              // Function to close the modal
  asset: Asset | null;              // The asset to display (null when closed)
  favorite: boolean;                // Whether the asset is favorited
  onToggleFavorite: () => void;     // Function to toggle favorite status
  onCopyLink: () => void;           // Function to copy asset link
};

/**
 * AssetModal Component
 *
 * Renders a modal dialog that displays asset information and provides
 * navigation options to type-specific detailed views.
 *
 * @param open - Controls modal visibility
 * @param onClose - Function to close the modal
 * @param asset - Asset data to display
 * @param favorite - Current favorite status
 * @param onToggleFavorite - Function to toggle favorite
 * @param onCopyLink - Function to copy link
 * @returns JSX.Element | null - The modal component or null if not open
 */
export default function AssetModal({ open, onClose, asset, favorite, onToggleFavorite, onCopyLink }: AssetModalProps) {
  // Extract modal setters from Zustand store for navigation to type-specific modals
  const { setKpiModalAsset, setDataVizModalAsset, setLayoutModalAsset, setStoryboardModalAsset } = useLibraryStore();

  // Early return if modal is not open or no asset is provided
  if (!open || !asset) return null;

  /**
   * Handle Navigation to KPI Details
   *
   * Closes the current modal and opens the KPI-specific modal
   * for detailed KPI information and interactions.
   */
  const handleViewKpiDetails = () => {
    onClose(); // Close asset modal first
    setKpiModalAsset(asset); // Then open KPI modal
  };

  /**
   * Handle Navigation to Data Visualization Details
   *
   * Closes the current modal and opens the DataViz-specific modal
   * for interactive chart viewing and analysis.
   */
  const handleViewDataVizDetails = () => {
    onClose(); // Close asset modal first
    setDataVizModalAsset(asset); // Then open Data Viz modal
  };

  /**
   * Handle Navigation to Layout Details
   *
   * Closes the current modal and opens the Layout-specific modal
   * for dashboard layout information and configuration.
   */
  const handleViewLayoutDetails = () => {
    onClose(); // Close asset modal first
    setLayoutModalAsset(asset); // Then open Layout modal
  };

  /**
   * Handle Navigation to Storyboard Details
   *
   * Closes the current modal and opens the Storyboard-specific modal
   * for presentation and filter configuration.
   */
  const handleViewStoryboardDetails = () => {
    onClose(); // Close asset modal first
    setStoryboardModalAsset(asset); // Then open Storyboard modal
  };

  /**
   * Handle Backdrop Click
   *
   * Closes the modal when clicking outside the modal content.
   * This provides an intuitive way to dismiss the modal.
   *
   * @param e - Mouse event from backdrop click
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
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
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={onClose}>&times;</button>

        {/* Asset Header - Icon and basic info */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            {/* Asset type icon placeholder */}
            <svg width="28" height="28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="#a3a3a3" strokeWidth="2" />
              <path d="M9 17c2-4 8-4 10 0" stroke="#a3a3a3" strokeWidth="2" />
              <circle cx="14" cy="12" r="2" fill="#a3a3a3" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-extrabold text-gray-900">{asset.name}</div>
            <div className="text-xs text-gray-600 font-semibold">{asset.type || 'Layout'}</div>
          </div>
        </div>

        {/* Asset Description */}
        <div className="text-gray-800 mb-4">{asset.description}</div>

        {/* Asset Tags - Categorization labels */}
        <div className="flex gap-2 mb-4">
          <span className="bg-gray-200 text-xs px-2 py-1 rounded text-gray-800 font-semibold">#rooms</span>
          <span className="bg-gray-200 text-xs px-2 py-1 rounded text-gray-800 font-semibold">#coverage</span>
          <span className="bg-gray-200 text-xs px-2 py-1 rounded text-gray-800 font-semibold">#stakeholders</span>
        </div>

        {/* Asset Statistics - Usage metrics and metadata */}
        <div className="flex gap-8 mb-4 text-sm">
          <div><div className="font-bold text-gray-900">2485</div><div className="text-gray-600">Used</div></div>
          <div><div className="font-bold text-gray-900">Universal</div><div className="text-gray-600">Type</div></div>
          <div><div className="font-bold text-gray-900">6</div><div className="text-gray-600">Pages No.</div></div>
          <div><div className="font-bold text-gray-900">07/23/2024</div><div className="text-gray-600">Last Updated</div></div>
        </div>

        {/* Business Questions Section - Sample questions this asset addresses */}
        <div className="mb-4">
          <div className="font-bold mb-2 text-gray-900">Business Questions</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="font-bold text-gray-900">Question 1</span><div className="text-gray-700">Short description of the item goes nicely here.</div></div>
            <div><span className="font-bold text-gray-900">Question 2</span><div className="text-gray-700">Short description of the item goes nicely here.</div></div>
            <div><span className="font-bold text-gray-900">Question 3</span><div className="text-gray-700">Short description of the item goes nicely here.</div></div>
            <div><span className="font-bold text-gray-900">Question 4</span><div className="text-gray-700">Short description of the item goes nicely here.</div></div>
          </div>
        </div>

        {/* Action Buttons - Primary interactions */}
        <div className="flex gap-2 mb-4">
          {/* Favorite Button - Toggle favorite status */}
          <button
            className={`w-full bg-gray-900 text-white py-2 rounded-lg font-bold hover:bg-gray-700 transition flex-1 flex items-center justify-center gap-2 ${favorite ? 'opacity-100' : 'opacity-80'}`}
            onClick={onToggleFavorite}
          >
            {favorite ? '★ Favorited' : '☆ Favorite'}
          </button>

          {/* Copy Link Button - Copy direct link to asset */}
          <button
            className="w-full bg-gray-100 text-gray-900 py-2 rounded-lg font-bold hover:bg-gray-200 transition flex-1 flex items-center justify-center gap-2"
            onClick={onCopyLink}
          >
            Copy Link
          </button>
        </div>

        {/* Type-specific Navigation Buttons - Conditional rendering based on asset type */}
        {asset.type === 'KPI' && (
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition mt-2"
            onClick={handleViewKpiDetails}
          >
            View KPI Details
          </button>
        )}
        {asset.type === 'DataViz' && (
          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition mt-2"
            onClick={handleViewDataVizDetails}
          >
            View Data Viz Details
          </button>
        )}
        {asset.type === 'Layout' && (
          <button
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold hover:bg-purple-700 transition mt-2"
            onClick={handleViewLayoutDetails}
          >
            View Layout Details
          </button>
        )}
        {asset.type === 'Storyboard' && (
          <button
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-bold hover:bg-orange-700 transition mt-2"
            onClick={handleViewStoryboardDetails}
          >
            View Storyboard Details
          </button>
        )}
      </div>
    </div>
  );
}