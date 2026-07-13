/** Stylised continent landmasses for equirectangular 1000×500 projection */
export function WorldMapSvg({ className }: { className?: string }) {
  return (
    <g className={className}>
      {/* North America */}
      <path
        d="M 48 72 L 88 58 L 130 48 L 175 55 L 210 68 L 235 95 L 248 130 L 242 168 L 220 195 L 195 210 L 168 218 L 140 212 L 115 198 L 95 175 L 78 148 L 62 118 L 52 92 Z
           M 195 210 L 205 228 L 198 248 L 178 258 L 158 252 L 148 235 Z"
        fill="currentColor"
      />
      {/* Greenland */}
      <path d="M 248 42 L 268 38 L 278 52 L 272 68 L 255 72 L 242 58 Z" fill="currentColor" />
      {/* South America */}
      <path
        d="M 218 248 L 238 242 L 252 258 L 258 290 L 252 330 L 240 368 L 225 395 L 210 408 L 198 398 L 192 365 L 198 320 L 205 278 Z"
        fill="currentColor"
      />
      {/* Europe */}
      <path
        d="M 468 98 L 498 88 L 522 95 L 535 112 L 528 132 L 508 142 L 485 138 L 468 122 L 462 108 Z"
        fill="currentColor"
      />
      {/* Africa */}
      <path
        d="M 478 148 L 508 142 L 528 158 L 538 195 L 535 248 L 522 298 L 505 338 L 488 358 L 472 348 L 465 305 L 468 248 L 472 195 Z"
        fill="currentColor"
      />
      {/* Asia */}
      <path
        d="M 528 62 L 580 48 L 640 42 L 720 48 L 780 62 L 820 82 L 848 108 L 858 142 L 848 178 L 820 205 L 775 218 L 720 222 L 660 215 L 600 198 L 555 178 L 530 152 L 522 118 L 525 82 Z"
        fill="currentColor"
      />
      {/* India subcontinent */}
      <path d="M 648 178 L 668 172 L 678 195 L 672 218 L 655 228 L 642 212 Z" fill="currentColor" />
      {/* Southeast Asia / Indonesia */}
      <path d="M 720 222 L 760 218 L 778 235 L 772 252 L 748 258 L 725 245 Z" fill="currentColor" />
      {/* Australia */}
      <path
        d="M 778 318 L 818 308 L 848 322 L 855 348 L 838 368 L 805 375 L 778 362 L 768 338 Z"
        fill="currentColor"
      />
      {/* UK */}
      <path d="M 458 102 L 468 98 L 472 108 L 465 118 L 455 114 Z" fill="currentColor" />
      {/* Japan */}
      <path d="M 838 142 L 848 138 L 852 152 L 845 162 L 835 158 Z" fill="currentColor" />
    </g>
  );
}