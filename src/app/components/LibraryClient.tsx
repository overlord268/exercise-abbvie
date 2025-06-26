/**
 * Library Client Component
 *
 * This is the main client-side component for the Asset Library application.
 * It handles the complete library interface including search, filtering, tabs,
 * asset display, and modal management.
 *
 * The component uses Zustand for state management and provides a responsive
 * interface for browsing and interacting with business assets.
 */

'use client'

import AssetCard from "./AssetCard";
import AssetModal from "./AssetModal";
import KpiModal from "./KpiModal";
import DataVizModal from "./DataVizModal";
import LayoutModal from "./LayoutModal";
import StoryboardModal from "./StoryboardModal";
import { useLibraryStore } from "../store/libraryStore";
import type { Asset } from "../store/libraryStore";

/**
 * Available Tabs Configuration
 *
 * Defines the navigation tabs available in the library interface.
 * Each tab corresponds to a different asset type or view.
 */
const TABS = ["Featured", "KPI", "Layouts", "Storyboards", "DataViz"];

/**
 * Copy Link Helper Function
 *
 * Copies a direct link to a specific asset to the user's clipboard.
 * The link includes the asset ID as a hash fragment for direct navigation.
 *
 * @param asset - The asset to create a link for
 */
function copyLink(asset: Asset) {
  if (typeof window !== "undefined") {
    navigator.clipboard.writeText(window.location.origin + "#asset-" + asset.id);
  }
}

/**
 * Component Props Interface
 *
 * Defines the props required by the LibraryClient component.
 */
type Props = {
  assets: Asset[];  // Array of assets to display in the library
};

/**
 * LibraryClient Component
 *
 * The main library interface component that provides:
 * - Search functionality with recent searches
 * - Tab-based filtering by asset type
 * - Asset grid display with pagination
 * - Modal management for asset details
 * - Favorites management
 *
 * @param assets - Array of assets to display
 * @returns JSX.Element - The complete library interface
 */
export default function LibraryClient({ assets }: Props) {
  // Extract state and actions from Zustand store
  const {
    tab, setTab,                                    // Current tab and tab setter
    modalAsset, setModalAsset,                      // Legacy modal management
    search, setSearch,                              // Search query and setter
    recentSearches, addRecentSearch, clearRecentSearches,  // Recent searches management
    favorites, toggleFavorite,                      // Favorites management
    showMore, setShowMore                           // Show more/less pagination
  } = useLibraryStore();

  /**
   * Filter Assets by Tab
   *
   * Filters the assets array based on the currently selected tab.
   * The Featured tab shows all assets, while other tabs filter by asset type.
   *
   * @returns Asset[] - Filtered array of assets
   */
  const getFilteredAssetsByTab = () => {
    switch (tab) {
      case "KPI":
        return assets.filter(asset => asset.type === "KPI");
      case "Layouts":
        return assets.filter(asset => asset.type === "Layout");
      case "Storyboards":
        return assets.filter(asset => asset.type === "Storyboard");
      case "DataViz":
        return assets.filter(asset => asset.type === "DataViz");
      case "Featured":
      default:
        return assets; // Show all assets in Featured tab
    }
  };

  /**
   * Filter Assets by Search Query
   *
   * Filters assets based on the current search query. Searches both
   * asset names and descriptions for case-insensitive matches.
   *
   * @param assetList - Array of assets to filter
   * @returns Asset[] - Filtered array of assets matching search
   */
  const getFilteredAssetsBySearch = (assetList: Asset[]) => {
    return search.trim()
      ? assetList.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase()))
      : assetList;
  };

  // Apply both tab and search filters to get final asset list
  const tabFilteredAssets = getFilteredAssetsByTab();
  const filteredAssets = getFilteredAssetsBySearch(tabFilteredAssets);

  // Pagination logic: show first 4 assets or all assets based on showMore state
  const visibleAssets = showMore ? filteredAssets : filteredAssets.slice(0, 4);

  return (
    <>
      {/* Modal Components - All modals are rendered but controlled by their individual state */}
      <KpiModal />
      <DataVizModal />
      <LayoutModal />
      <StoryboardModal />

      {/* Header Section */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center w-full">Library</h1>
        <button className="absolute right-8 top-8 bg-gray-200 px-4 py-2 rounded-lg font-bold text-gray-900 hover:bg-gray-300">Request</button>
      </header>

      {/* Description */}
      <p className="text-center text-gray-700 mb-6">Browse for assets needed to report and present analysis.</p>

      {/* Search Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex w-full max-w-md gap-2">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onBlur={() => addRecentSearch(search)}  // Add to recent searches when user finishes typing
            placeholder="Type to search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 placeholder-gray-400"
          />
          {/* Clear search button - only shown when there's a search query */}
          {search && (
            <button
              className="px-2 text-gray-500 hover:text-gray-900"
              onClick={() => setSearch("")}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Recent Searches Section */}
        {recentSearches.length > 0 && (
          <div className="w-full max-w-md mt-2 flex flex-wrap gap-2 items-center text-xs text-gray-600">
            <span className="font-semibold">Recent:</span>
            {recentSearches.map((s, i) => (
              <button
                key={s + i}
                className="bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                onClick={() => setSearch(s)}  // Click to reuse search term
              >
                {s}
              </button>
            ))}
            <button className="ml-auto text-gray-400 hover:text-gray-700" onClick={clearRecentSearches} title="Clear recent searches">Clear</button>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded-lg font-bold transition border ${tab === t ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Assets Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-1 text-gray-900">{tab === "Featured" ? "Featured" : tab}</h2>
        <div className="text-gray-500 text-sm mb-4">
          {tab === "Featured"
            ? "Curated top picks from this week"
            : `${tab} assets available`
          }
        </div>

        {/* Empty State or Asset Grid */}
        {visibleAssets.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {search.trim()
              ? "Not seeing what you want? Try searching for something else."
              : `No ${tab.toLowerCase()} assets found.`
            }
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} onClick={() => setModalAsset(asset)} />
            ))}
          </div>
        )}

        {/* Show More/Less Button */}
        {filteredAssets.length > 4 && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 rounded-lg border font-bold text-gray-900 bg-gray-100 hover:bg-gray-200"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </section>

      {/* Legacy Asset Modal - Handles generic asset display */}
      <AssetModal
        open={!!modalAsset}
        asset={modalAsset}
        onClose={() => setModalAsset(null)}
        favorite={modalAsset ? favorites.includes(modalAsset.id) : false}
        onToggleFavorite={() => modalAsset && toggleFavorite(modalAsset.id)}
        onCopyLink={() => modalAsset && copyLink(modalAsset)}
      />
    </>
  );
}