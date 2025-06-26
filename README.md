# Library Management System

A comprehensive asset management application for tracking and organizing business KPIs, layouts, data visualizations, and storyboards. Built with Next.js 15, TypeScript, Tailwind CSS, and Zustand for state management.

## 🎯 Project Overview

This application serves as a centralized library for business intelligence assets, allowing users to:

- **Browse and search** through different types of business assets
- **View detailed information** about KPIs, layouts, data visualizations, and storyboards
- **Request access** to restricted assets
- **Filter and organize** assets by type and search criteria
- **Interact with charts** and data visualizations
- **Manage favorites** and track usage

## 🚀 Key Features

### Asset Management
- **KPI Tracking**: View calculation methods, business questions, and available visualizations
- **Layout Management**: Browse dashboard layouts with page counts and KPI integrations
- **Data Visualization**: Interactive charts (line, bar, pie) with real-time data
- **Storyboard Creation**: PowerPoint-style presentations with access control

### User Experience
- **Advanced Search**: Real-time filtering with recent search history
- **Tab Navigation**: Filter assets by type (Featured, KPI, Layouts, Storyboards, DataViz)
- **Modal System**: Detailed asset information in overlay modals
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Click Outside to Close**: Intuitive modal dismissal

### Interactive Elements
- **Chart Interactions**: Hover tooltips, click events, and responsive charts
- **Favorites System**: Bookmark and track frequently used assets
- **Access Requests**: Form-based system for requesting asset access
- **Copy Links**: Share assets with direct links

## 🛠 Technology Stack

### Frontend Framework
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework

### State Management
- **Zustand**: Lightweight state management
- **React Hooks**: Component-level state management

### Data Visualization
- **Recharts**: React charting library
- **Responsive Charts**: Line, bar, and pie charts

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Node.js**: Runtime environment

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── charts/           # Chart components
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   └── PieChart.tsx
│   │   ├── AssetCard.tsx     # Asset display card
│   │   ├── AssetModal.tsx    # Main asset details modal
│   │   ├── DataVizModal.tsx  # Data visualization modal
│   │   ├── KpiModal.tsx      # KPI details modal
│   │   ├── LayoutModal.tsx   # Layout details modal
│   │   ├── LibraryClient.tsx # Main client component
│   │   └── StoryboardModal.tsx # Storyboard modal
│   ├── store/
│   │   └── libraryStore.ts   # Zustand state management
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page component
├── public/                   # Static assets
└── package.json
```

## 🎨 Component Architecture

### Core Components

#### `LibraryClient.tsx`
- Main client-side component handling all user interactions
- Manages tab switching, search, and modal state
- Renders asset grid and navigation elements

#### `AssetCard.tsx`
- Reusable card component for displaying asset previews
- Shows asset name, description, and metadata
- Handles click events to open detailed modals

#### Modal System
- **AssetModal**: General asset information with type-specific action buttons
- **KpiModal**: KPI-specific details (calculations, business questions, metrics)
- **DataVizModal**: Interactive charts and visualization details
- **LayoutModal**: Layout information (pages, KPIs used, preview)
- **StoryboardModal**: Storyboard details with access request form

### Chart Components

#### `RevenueChart.tsx`
- Line chart showing revenue growth over time
- Interactive tooltips and responsive design
- Mock data for 12-month revenue trends

#### `BarChart.tsx`
- Regional performance comparison
- Bar chart with revenue and growth data
- Hover interactions and formatted tooltips

#### `PieChart.tsx`
- Product category distribution
- Market share visualization
- Color-coded segments with legends

## 🔧 State Management

### Zustand Store (`libraryStore.ts`)

The application uses Zustand for centralized state management with the following state:

```typescript
type LibraryState = {
  // UI State
  tab: string                    // Current active tab
  search: string                 // Search query
  showMore: boolean             // Pagination state

  // Modal State
  modalAsset: Asset | null      // Main asset modal
  kpiModalAsset: Asset | null   // KPI details modal
  dataVizModalAsset: Asset | null // Data viz modal
  layoutModalAsset: Asset | null  // Layout modal
  storyboardModalAsset: Asset | null // Storyboard modal

  // User Data
  recentSearches: string[]      // Search history
  favorites: number[]           // Favorited asset IDs
}
```

### Key Actions
- `setTab()`: Switch between asset type tabs
- `setSearch()`: Update search query with filtering
- `addRecentSearch()`: Track search history
- `toggleFavorite()`: Add/remove favorites
- `setModalAsset()`: Open/close various modals

## 📊 Asset Types

### KPI (Key Performance Indicators)
- **Purpose**: Track business metrics and calculations
- **Features**: Business questions, metric IDs, calculations, available visualizations
- **Example**: Revenue Growth KPI with calculation formula

### Layout
- **Purpose**: Dashboard templates and page layouts
- **Features**: Page count, KPI integrations, layout previews
- **Example**: Executive Dashboard with 4 pages

### Data Visualization
- **Purpose**: Interactive charts and data representations
- **Features**: Chart types, interaction instructions, applicable KPIs
- **Examples**: Revenue charts, regional comparisons, product distributions

### Storyboard
- **Purpose**: Presentation templates for charts and data
- **Features**: Coupled KPIs/filters, affiliate access, request forms
- **Example**: Quarterly Performance Review with access control

## 🚀 Getting Started

### Prerequisites
- Node.js 18.16.1 or higher
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 🎯 User Journey

### 1. Asset Discovery
- Browse the main library page with featured assets
- Use tabs to filter by asset type (KPI, Layouts, Storyboards, DataViz)
- Search for specific assets using the search bar

### 2. Asset Exploration
- Click on asset cards to view detailed information
- Use "View Details" buttons for type-specific information
- Interact with charts and visualizations

### 3. Asset Management
- Favorite frequently used assets
- Copy asset links for sharing
- Request access to restricted storyboards

### 4. Data Analysis
- View KPI calculations and business questions
- Explore interactive charts with tooltips
- Analyze regional and product performance data
