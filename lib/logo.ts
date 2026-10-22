/**
 * The MMC logo as vector paths, traced from the client's master artwork
 * (house roof + window over the "MMC" letters; blush and cream panels on a
 * charcoal outline). Coordinates are in a 1000 × 865 box.
 *
 * Three layers, painted in order:
 *   silhouette — the charcoal outline shapes (roof, window, M M, C)
 *   blush      — the pink panels
 *   cream      — the off-white panels
 *
 * Kept as separate sub-paths so the preloader can draw and reveal each
 * piece on its own. Rendered by components/ui/LogoMark.tsx.
 */
export const LOGO = {
  width: 1000,
  height: 865,
  silhouette: [
    "M685.4 376.3 685.4 864.6 915.9 864.6 915.9 703.3 794.7 763.3 794.7 591.1 914.8 681.2 914.8 555.5Z",
    "M86.9 554.4 87.2 864.8 187.9 864.8 187.9 612.2 207 597.6 207.2 666.3 341 765.3 341 864.6 446.7 864.8 447 548.5 500.6 594.2 556.4 549.1 556.4 864.6 662.1 864.6 662.1 314.1 500.6 443.1 341.6 313.8 341.6 640.8 320.2 659.6 317.7 376.6Z",
    "M429.9 249.3 429.9 360.9 573.8 360.9 573.8 249.3Z",
    "M999.2 399.3 503.1 0.6 0.6 395.4 86.7 481.2 502.8 176.9 908.6 486.3Z",
  ],
  blush: [
    "M291.6 429.3 112.7 567.9 113 840.2 161.2 839.9 161.2 600.1 233.3 544 233.6 653.1 291.6 695.2Z",
    "M368.8 369.3 368.5 651.4 305.9 707.5 344.6 736.1 367.9 721.5 367.9 839.9 419.2 839.9 419.2 492.1 440.5 507.3 491.9 554.4 497.2 554.4 497.2 475 479 458.2 373.2 370.2Z",
    "M449.5 267.8 449.5 342.4 494.1 342.4 494.1 267.8Z",
    "M492.7 42.3 70.1 373.8 39.8 400.7 87.5 446.7 492.7 150.3Z",
  ],
  cream: [
    "M712.6 429.3 712.6 839 888.7 839 888.7 744.5 767 801.7 767 538.1 887.3 629.6 888.4 568.1Z",
    "M634.9 368.2 503.9 474.8 503.9 556.4 580.5 492.1 584.1 491.3 584.1 839.6 634.9 839.6Z",
    "M509.5 268.4 509.5 342.1 554.1 342.1 554.1 268.4Z",
    "M509.8 41.8 510.7 149.2 906.9 451.5 960.2 401.6Z",
  ],
} as const;
