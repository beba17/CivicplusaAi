/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#15313a',
    tint: '#e86f3d',

    // Core surfaces
    background: '#f4f0e8',
    foreground: '#15313a',

    // Cards / elevated surfaces
    card: '#fffaf0',
    cardForeground: '#15313a',

    // Primary action color (buttons, links, active states)
    primary: '#15313a',
    primaryForeground: '#f4f0e8',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#e5eee8',
    secondaryForeground: '#15313a',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#ebe5da',
    mutedForeground: '#5f747a',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#e86f3d',
    accentForeground: '#15313a',

    // Destructive actions (delete, error states)
    destructive: '#d95b55',
    destructiveForeground: '#fffaf0',

    // Borders and input outlines
    border: '#d8d1c5',
    input: '#d8d1c5',

    teal: '#178f8b',
    coral: '#e86f3d',
    ink: '#15313a',
    sand: '#f4f0e8',
    success: '#287d69',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 14,
};

export default colors;
