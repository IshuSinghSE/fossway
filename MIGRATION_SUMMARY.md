# Migration from Vite SPA to Next.js App Router

## Summary of Changes

This project has been successfully migrated from a Vite Single Page Application (SPA) to Next.js App Router architecture.

## Key Changes

### 1. **Routing System**
- **Before**: Custom `Router` component with client-side state management
- **After**: Next.js App Router with file-based routing

### 2. **File Structure**
```
app/
├── page.tsx           # Home page (/)
├── layout.tsx         # Root layout with ThemeProvider
├── team/
│   └── page.tsx      # Team page (/team)
├── issues/
│   └── page.tsx      # Issues page (/issues)
└── demo/
    └── page.tsx      # Demo page (/demo)
```

### 3. **Navigation Changes**
- **Removed**: Custom `navigate` function prop drilling
- **Added**: Next.js `Link` component and `useRouter` hook
- All components now use `<Link href="...">` instead of `onClick={() => navigate('...')}`

### 4. **Component Updates**

#### Updated Components:
1. **Header.tsx**
   - Removed `navigate` prop
   - Added Next.js `Link` for logo and CTA buttons
   - Uses `asChild` prop with Button component for proper link rendering

2. **EnhancedHero.tsx**
   - Removed `navigate` prop
   - Wrapped buttons with `Link` component
   - Updated to use `/issues` and `/demo` routes

3. **EnhancedFooter.tsx**
   - Removed `navigate` prop
   - Team link now uses Next.js `Link` to `/team`

4. **Team.tsx**
   - Removed `navigate` prop
   - Back button uses `Link` to `/`

5. **IssueDiscovery.tsx**
   - Removed `navigate` prop
   - Back button uses `Link` to `/`

6. **WatchDemo.tsx**
   - Removed `navigate` prop
   - All navigation uses `Link` component

### 5. **Layout Changes**
- `layout.tsx` now includes `ThemeProvider` wrapper
- Added `suppressHydrationWarning` to `<html>` for theme support
- Updated metadata with proper title and description

### 6. **Home Page (page.tsx)**
- Simplified to render components directly
- Removed complex routing logic
- ThemeProvider moved to layout

### 7. **TypeScript Configuration**
- Added CSS module declaration in `next-env.d.ts`

## Benefits of Migration

1. **Better SEO**: Each route is now server-rendered by default
2. **Improved Performance**: Automatic code splitting per route
3. **Simpler Navigation**: No prop drilling for navigation functions
4. **Type Safety**: Better TypeScript support with Next.js
5. **Better DX**: Hot reload and fast refresh improvements

## Routes Available

- `/` - Home page with all sections
- `/team` - Team members page
- `/issues` - Issue discovery page
- `/demo` - Demo video page

## How to Run

```bash
npm run dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000)

## Notes

- The old `Router.tsx` component is no longer used and can be removed
- All client-side navigation now uses Next.js built-in routing
- The app maintains the same UI/UX while benefiting from Next.js features
