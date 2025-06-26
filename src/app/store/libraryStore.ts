/**
 * Library Store - Global State Management
 *
 * This file contains the Zustand store that manages the global state for the Asset Library application.
 * It handles UI state like tabs, modals, search, favorites, and recent searches across all components.
 *
 * The store uses Zustand for lightweight, performant state management without the boilerplate
 * of Redux or the complexity of Context API.
 */

import { create } from 'zustand';

/**
 * Asset Type Definition
 *
 * Defines the structure for business assets in the library. Each asset can be one of four types:
 * - KPI: Key Performance Indicators with business questions and calculations
 * - Layout: Dashboard layouts that combine multiple KPIs
 * - DataViz: Interactive charts and visualizations
 * - Storyboard: Presentation-ready storyboards with filters
 *
 * Properties are optional based on asset type to accommodate different data requirements.
 */
export type Asset = {
  id: number;                                    // Unique identifier for the asset
  name: string;                                  // Display name of the asset
  description: string;                           // Brief description of the asset
  date: string;                                  // Creation or last modified date
  type?: 'KPI' | 'Layout' | 'Storyboard' | 'DataViz';  // Asset type classification

  // KPI-specific properties
  businessQuestions?: string[];                  // Business questions this KPI answers
  metricIds?: string[];                          // Associated metric identifiers
  calculation?: string;                          // Mathematical formula for the KPI
  visualsAvailable?: string[];                   // Available visualization types
  affiliateApplicability?: string;               // Which affiliates can use this KPI

  // DataViz-specific properties
  applicableKpis?: number[];                     // References to KPI asset IDs
  assetInfoContext?: string;                     // Context about the visualization
  chartInteraction?: string;                     // Instructions for chart interaction

  // Layout-specific properties
  amountOfPages?: number;                        // Number of pages in the layout
  kpisBeingUsed?: number[];                      // References to KPI asset IDs used

  // Storyboard-specific properties
  coupledKpisFilters?: string[];                 // Available filters for the storyboard
  applicableAffiliates?: string[];               // Affiliates that can access this storyboard
};

/**
 * Library State Interface
 *
 * Defines the complete state structure and actions for the library store.
 * Each property represents a piece of state, and each function represents an action
 * that can modify that state.
 */
type LibraryState = {
  // Tab Management
  tab: string;                                   // Currently active tab
  setTab: (tab: string) => void;                 // Function to change active tab

  // Modal Management
  modalAsset: Asset | null;                      // Currently open modal asset (legacy)
  setModalAsset: (asset: Asset | null) => void;  // Function to open/close modal

  // Search Management
  search: string;                                // Current search query
  setSearch: (search: string) => void;           // Function to update search query
  recentSearches: string[];                      // Array of recent search terms
  addRecentSearch: (search: string) => void;     // Function to add search to history
  clearRecentSearches: () => void;               // Function to clear search history

  // Favorites Management
  favorites: number[];                           // Array of favorite asset IDs
  toggleFavorite: (id: number) => void;          // Function to toggle favorite status

  // UI State
  showMore: boolean;                             // Whether to show more content
  setShowMore: (show: boolean) => void;          // Function to toggle show more state

  // Type-specific Modal Management
  kpiModalAsset: Asset | null;                   // Currently open KPI modal
  setKpiModalAsset: (asset: Asset | null) => void;
  dataVizModalAsset: Asset | null;               // Currently open DataViz modal
  setDataVizModalAsset: (asset: Asset | null) => void;
  layoutModalAsset: Asset | null;                // Currently open Layout modal
  setLayoutModalAsset: (asset: Asset | null) => void;
  storyboardModalAsset: Asset | null;            // Currently open Storyboard modal
  setStoryboardModalAsset: (asset: Asset | null) => void;
};

/**
 * Library Store Instance
 *
 * Creates and configures the Zustand store with all state properties and actions.
 * The store is initialized with default values and provides functions to update state.
 */
export const useLibraryStore = create<LibraryState>((set, get) => ({
  // Tab Management - Default to Featured tab
  tab: 'Featured',
  setTab: (tab) => set({ tab }),

  // Modal Management - Legacy modal system
  modalAsset: null,
  setModalAsset: (asset) => set({ modalAsset: asset }),

  // Search Management - Empty search by default
  search: '',
  setSearch: (search) => set({ search }),
  recentSearches: [],

  /**
   * Add Recent Search
   *
   * Adds a search term to the recent searches list. The function:
   * - Validates the search term is not empty
   * - Removes duplicates by filtering out existing matches
   * - Adds the new search to the beginning of the array
   * - Limits the list to 5 items for performance
   *
   * @param search - The search term to add
   */
  addRecentSearch: (search) => {
    if (!search.trim()) return;
    set((state) => ({
      recentSearches: [search, ...state.recentSearches.filter((s) => s !== search)].slice(0, 5),
    }));
  },

  /**
   * Clear Recent Searches
   *
   * Resets the recent searches array to empty.
   */
  clearRecentSearches: () => set({ recentSearches: [] }),

  // Favorites Management - Empty favorites list by default
  favorites: [],

  /**
   * Toggle Favorite
   *
   * Toggles the favorite status of an asset. If the asset is already favorited,
   * it removes it from favorites. If not favorited, it adds it to the beginning
   * of the favorites list.
   *
   * @param id - The asset ID to toggle favorite status for
   */
  toggleFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fid) => fid !== id)
        : [id, ...state.favorites],
    }));
  },

  // UI State - Show more disabled by default
  showMore: false,
  setShowMore: (show) => set({ showMore: show }),

  // Type-specific Modal Management - All modals closed by default
  kpiModalAsset: null,
  setKpiModalAsset: (asset) => set({ kpiModalAsset: asset }),
  dataVizModalAsset: null,
  setDataVizModalAsset: (asset) => set({ dataVizModalAsset: asset }),
  layoutModalAsset: null,
  setLayoutModalAsset: (asset) => set({ layoutModalAsset: asset }),
  storyboardModalAsset: null,
  setStoryboardModalAsset: (asset) => set({ storyboardModalAsset: asset }),
}));