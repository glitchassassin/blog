# Theme Implementation

This project includes a simplified dark/light theme implementation that
automatically follows the user's system theme preference.

## Features

✅ **Client Hints**: Automatically detects user's system theme preference ✅
**No Flash of Incorrect Theme**: Server-side rendering with correct theme ✅
**System Theme Sync**: Automatically updates when system theme changes ✅
**Lightweight**: No cookies, no manual switching - just follows system
preference

## Implementation Details

### Files Added/Modified

1. **`app/utils/client-hints.tsx`** - Client hints utilities for theme detection
2. **`app/utils/request-info.ts`** - Hook for accessing request information
3. **`app/root.tsx`** - Root loader and theme application

### Dependencies Added

- `@epic-web/client-hints` - Client hints functionality

### How It Works

1. **Client Hints**: Script detects system theme preference and sets cookie
2. **Server Rendering**: Server reads theme from client hints and applies
   correct class
3. **Automatic Updates**: Revalidates when system theme preference changes

### Usage

The theme automatically follows the user's system preference:

- Light mode when system is set to light
- Dark mode when system is set to dark

No manual controls are provided - the theme purely follows system preference.

## CSS Classes

The theme is applied via CSS classes on the `<html>` element:

- `.light` - Light theme
- `.dark` - Dark theme

Use Tailwind's `dark:` prefix for dark mode styles, or CSS custom properties for
more complex theming.

## Simplicity

This implementation prioritizes simplicity and automatic behavior over manual
control. Users get a theme that matches their system preference without any
additional UI or complexity.
