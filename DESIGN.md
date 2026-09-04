# Tejus Dinesh Website Design

## Design read

A contemporary personal website for recruiters, collaborators, and people who
want the broader context behind the work. The page should feel composed and
human, not like a dashboard, terminal, or simulated operating system.

## Visual source

The palette comes from the coral portrait:

- Coral #df6f63: the only interactive accent.
- Cool pearl #eef1f1: primary light canvas.
- Glass gray #e4e9ea: secondary surfaces.
- Graphite #182125: primary light-theme text.
- Night graphite #111719: primary dark canvas.

The cool neutrals reflect the glass and steel setting. Coral connects the
interface to the portrait without turning every surface pink.

## Composition

- Use a portrait-led asymmetric hero with a two-line headline.
- Give work one large interactive showcase instead of a grid of cards.
- Keep experience as a prominent full-width timeline with expandable detail.
- Use personal interests as context, never as a forced visual metaphor.
- Leave room for future notes, photographs, and trip records without showing
  empty or invented sections.

## Type and shape

- Use the native system sans stack for an Apple-adjacent, fast-loading feel.
- Use the system monospace stack only for technical results.
- Use an 8px radius for panels and controls.
- Use thin structure lines and generous spacing instead of nested cards.

## Motion

- Motion must explain state: hero arrival, focus changes, project changes, and
  expandable roles.
- Use transform and opacity animations.
- Use IntersectionObserver for entry reveals.
- Respect reduced-motion and reduced-transparency preferences.

## Material note

The translucent header is an honest web approximation built with
backdrop-filter, layered borders, and a solid fallback. It is not Apple's
native Liquid Glass implementation, which is available through Apple platform
APIs rather than a public web CSS package.
