# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Emojizen is a modern emoji picker website built with Next.js 15. It features real-time search, category filtering, one-click copying, and a glassmorphism UI design. The application displays 1,910+ emojis across multiple categories with comprehensive search capabilities.

- **Framework**: Next.js 15.4.5 with App Router (static export mode)
- **Runtime**: React 19.1.0 
- **Language**: TypeScript with strict mode enabled
- **Package Manager**: pnpm
- **Styling**: CSS Modules with modern CSS features
- **Deployment**: GitHub Pages via GitHub Actions

## Common Commands

```bash
# Development
pnpm dev          # Start development server on http://localhost:3000

# Building
pnpm build        # Build for production (static export to /out)
pnpm start        # Start production server (not used in static mode)

# Code Quality
pnpm lint         # Run ESLint

# Deployment (automatic on push to master)
pnpm export       # Alias for build (legacy)
pnpm deploy       # Build + create .nojekyll file
```

## Architecture

The app follows a client-side architecture with React state management:

### Core Components Structure
- **`page.tsx`**: Main app container with search/filter state management
- **`EmojiGrid`**: Handles emoji filtering, grouping, and rendering logic
- **`EmojiCard`**: Individual emoji display with click-to-copy functionality
- **`SearchBar`**: Real-time search input with debouncing
- **`CategoryFilter`**: Category selection UI
- **`CopyNotification`**: Toast notification for copy feedback

### Data Architecture
- **`emojis.json`**: Single source of truth containing categories and emoji data
- Each emoji has: `emoji`, `name`, `keywords[]` properties
- Categories structure: `{id, name, emojis[]}` 
- State flows: search query → filter logic → display grid

### Key Features Implementation
- **Search**: Filters by emoji name and keywords (case-insensitive)
- **Category filtering**: Shows emojis from selected category only
- **Clipboard integration**: Uses browser Clipboard API for copying
- **Responsive design**: CSS Grid with responsive breakpoints

## Static Site Configuration

The app uses Next.js static export mode for GitHub Pages deployment:

- **`next.config.ts`**: Configured for static export with unoptimized images
- **Custom domain setup**: basePath/assetPrefix commented out for custom domain
- **GitHub Actions**: Automated deployment on master branch pushes
- **Output directory**: `./out` (created during build)

## Development Notes

- All components are client-side (`'use client'`) due to interactive features
- CSS Modules provide scoped styling for each component
- TypeScript interfaces define emoji and category data structures
- Search and filtering logic uses React useMemo for performance
- Copy functionality includes visual feedback via notification system