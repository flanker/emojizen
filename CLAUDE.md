# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 project called "emojizen" bootstrapped with create-next-app. It uses the App Router architecture with TypeScript and includes:

- **Framework**: Next.js 15.4.5 with App Router
- **Runtime**: React 19.1.0 
- **Language**: TypeScript with strict mode enabled
- **Package Manager**: pnpm (based on pnpm-lock.yaml)
- **Fonts**: Geist and Geist Mono from Google Fonts
- **Linting**: ESLint with Next.js configuration

## Common Commands

```bash
# Development
pnpm dev          # Start development server on http://localhost:3000

# Building
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## Project Structure

```
src/
├── app/                 # App Router directory
│   ├── layout.tsx      # Root layout with Geist fonts
│   ├── page.tsx        # Home page component
│   ├── globals.css     # Global styles
│   └── page.module.css # Home page CSS modules
public/                 # Static assets (SVG icons)
```

## Key Configuration

- **TypeScript**: Configured with path aliases (`@/*` maps to `./src/*`)
- **Fonts**: Geist Sans and Geist Mono loaded via next/font/google
- **Styling**: CSS Modules used for component-specific styles
- **Images**: Next.js Image component used for optimized loading

## Development Notes

- Uses CSS Modules for styling (`.module.css` files)
- All pages and layouts are in TypeScript
- Static assets are served from the `public/` directory
- The project follows Next.js App Router conventions