# React + TypeScript + Vite

A responsive web dashboard for monitoring and controlling smart cistern (IoT) devices.  
Built with **React 18**, **TypeScript**, **React Query**, **React Router**, and **Plain CSS**, it showcases device listing and control commands in a clean, theme-aware UI.


## Live Demo

**https://my-cistern-task.vercel.app**

_(Deployed on Vercel)_



## Quick Start

```bash
# 1. Clone
git clone <your-repo-url>
cd mycistern

# 2. Install dependencies
pnpm install

# 3. Run the development server
pnpm dev

# 4. Open in browser
http://localhost:5173
```

## Architecture

- **src/app/**
  - App shell, router, global theme + i18n providers
  - Online/offline status badges.
  - Graceful loading, empty, and error states.

- **src/api/**
  - Mock API (getDevices, getDeviceDetails, getDeviceMetrics, postDeviceCommand)

- **src/features/devices/**
  - Feature modules: list, detail, metrics, send command

- **src/shared/**
 - Shared components, i18n context, theme context, error/loader views

- **src/index.css**
  - Plain CSS styling, theming variables, responsive layout

## Features

- **Plate Management**
  - Paginated list with search filter.
  - Online/offline status badges.
  - Graceful loading, empty, and error states.

- **Device Detail**
  - Displays cistern info, firmware, and location.
  - Color-coded info boxes for metrics and commands.
  - Back navigation

- **Live Metrics**
  - Auto-updates every 5 seconds using React Query.
  - Shows temperature, fill level, battery status.
  - Handles network errors gracefully.

- **Send Command**
  - Buttons for PING, REBOOT, VALVE OPEN.
  - Disabled while pending.
  - Messages on success/error

- **Theming & i18n**
  - Light/dark mode toggle
  - English / German language switch

- **Error Handling & Routing**
  - Unified error + retry component
  - 404 for invalid url.

## Assumptions

- API endpoints are mocked for local demo

- React Query caching handles real backend integration

- No authentication or user roles

- Single-page app optimized for desktop view

## Limitations

- Data resets on refresh (mock only)
- Polling interval fixed (configurable in future)
 
