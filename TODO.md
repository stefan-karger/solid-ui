# SolidJS 2.x port TODO

This checklist tracks the registry components that are still blocked on SolidJS 2.x-compatible dependency releases.

- Pending packages: 7
- Pending components: 7
- Pending examples: 50
- Compatibility target: the package must support the SolidJS 2.x versions used by this repository.

When checking a package, run the listed command and inspect both its current version and `peerDependencies`. Once support is available, verify the component and its examples with `pnpm validate` before checking them off.

## `@corvu/calendar`

- Package: [npm](https://www.npmjs.com/package/@corvu/calendar)
- Source version: `^0.1.2`
- Other component dependency: `date-fns`
- Check: `pnpm view @corvu/calendar version peerDependencies`
- [ ] SolidJS 2.x support confirmed
- [ ] Component: `calendar`
- Examples:
  - [ ] `calendar-basic`
  - [ ] `calendar-booked-dates`
  - [ ] `calendar-caption`
  - [ ] `calendar-custom-days`
  - [ ] `calendar-demo`
  - [ ] `calendar-presets`
  - [ ] `calendar-range`
  - [ ] `calendar-time`
  - [ ] `calendar-week-numbers`
  - [ ] `date-picker-basic`
  - [ ] `date-picker-demo`
  - [ ] `date-picker-dob`
  - [ ] `date-picker-input`
  - [ ] `date-picker-natural-language`
  - [ ] `date-picker-range`
  - [ ] `date-picker-time`

## `embla-carousel-solid`

- Packages: [embla-carousel-solid](https://www.npmjs.com/package/embla-carousel-solid), [embla-carousel](https://www.npmjs.com/package/embla-carousel), and [embla-carousel-autoplay](https://www.npmjs.com/package/embla-carousel-autoplay)
- Source versions: `^8.6.0`
- Check: `pnpm view embla-carousel-solid version peerDependencies`
- [ ] SolidJS 2.x support confirmed
- [ ] Component: `carousel`
- Examples:
  - [ ] `carousel-api`
  - [ ] `carousel-demo`
  - [ ] `carousel-orientation`
  - [ ] `carousel-plugin`
  - [ ] `carousel-size`
  - [ ] `carousel-spacing`

## `solid-charts`

- Package: [npm](https://www.npmjs.com/package/solid-charts)
- Source version: `^0.0.2`
- Check: `pnpm view solid-charts version peerDependencies`
- [ ] SolidJS 2.x support confirmed
- [ ] Component: `chart`
- Examples:
  - [ ] `chart-demo`
  - [ ] `chart-example`
  - [ ] `chart-example-axis`
  - [ ] `chart-example-grid`
  - [ ] `chart-example-legend`
  - [ ] `chart-example-tooltip`
  - [ ] `chart-tooltip`

## `@corvu/drawer`

- Package: [npm](https://www.npmjs.com/package/@corvu/drawer)
- Source version: `^0.2.4`
- Check: `pnpm view @corvu/drawer version peerDependencies`
- [ ] SolidJS 2.x support confirmed
- [ ] Component: `drawer`
- Examples:
  - [ ] `drawer-demo`
  - [ ] `drawer-dialog`
  - [ ] `drawer-scrollable-content`
  - [ ] `drawer-sides`

## `@corvu/otp-field`

- Package: [npm](https://www.npmjs.com/package/@corvu/otp-field)
- Source version: `^0.1.4`
- Check: `pnpm view @corvu/otp-field version peerDependencies`
- [ ] SolidJS 2.x support confirmed
- [ ] Component: `input-otp`
- Examples:
  - [ ] `field-example`
  - [ ] `input-otp-alphanumeric`
  - [ ] `input-otp-controlled`
  - [ ] `input-otp-demo`
  - [ ] `input-otp-disabled`
  - [ ] `input-otp-form`
  - [ ] `input-otp-four-digits`
  - [ ] `input-otp-invalid`
  - [ ] `input-otp-pattern`
  - [ ] `input-otp-separator`

## `@corvu/resizable`

- Package: [npm](https://www.npmjs.com/package/@corvu/resizable)
- Source version: `^0.2.5`
- Check: `pnpm view @corvu/resizable version peerDependencies`
- [ ] SolidJS 2.x support confirmed
- [ ] Component: `resizable`
- Examples:
  - [ ] `resizable-demo`
  - [ ] `resizable-handle`
  - [ ] `resizable-vertical`

## `solid-sonner`

- Package: [npm](https://www.npmjs.com/package/solid-sonner)
- Source version: `^0.3.1`
- Other component dependency: `@kobalte/core` (already ported to 2.x here)
- Check: `pnpm view solid-sonner version peerDependencies`
- [ ] SolidJS 2.x support confirmed
- [ ] Component: `sonner`
- Examples:
  - [ ] `sonner-demo`
  - [ ] `sonner-description`
  - [ ] `sonner-position`
  - [ ] `sonner-types`
