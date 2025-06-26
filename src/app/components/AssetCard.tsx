/**
 * Asset Card Component
 *
 * A reusable card component that displays individual assets in the library grid.
 * Each card shows the asset's name, description, and date in a clickable format
 * that opens the asset details modal.
 *
 * The component uses a consistent design with hover effects and proper accessibility
 * for keyboard navigation and screen readers.
 */

/**
 * Asset Card Props Interface
 *
 * Defines the props required by the AssetCard component.
 */
type AssetCardProps = {
  asset: {
    id: number;        // Unique identifier for the asset
    name: string;      // Display name of the asset
    description: string; // Brief description of the asset
    date: string;      // Creation or last modified date
  };
  onClick: () => void; // Callback function when card is clicked
};

/**
 * AssetCard Component
 *
 * Renders a clickable card that displays asset information in a grid layout.
 * The card includes an icon placeholder, asset details, and hover effects
 * for better user interaction feedback.
 *
 * @param asset - The asset data to display
 * @param onClick - Function to call when the card is clicked
 * @returns JSX.Element - The rendered asset card
 */
export default function AssetCard({ asset, onClick }: AssetCardProps) {
  return (
    <button
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition w-full text-left"
      onClick={onClick}
    >
      {/* Icon Container - Placeholder for asset type icons */}
      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
        {/* Placeholder SVG icon - represents a generic document/asset */}
        <svg width="32" height="32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#a3a3a3" strokeWidth="2" />
          <path d="M10 20c2-4 8-4 10 0" stroke="#a3a3a3" strokeWidth="2" />
          <circle cx="16" cy="14" r="2" fill="#a3a3a3" />
        </svg>
      </div>

      {/* Asset Information Container */}
      <div>
        {/* Asset Name - Primary identifier */}
        <div className="font-bold text-gray-900">{asset.name}</div>

        {/* Asset Description - Brief overview */}
        <div className="text-sm text-gray-700">{asset.description}</div>

        {/* Asset Date - Creation or modification date */}
        <div className="text-xs text-gray-500 mt-1">{asset.date}</div>
      </div>
    </button>
  );
}