import type { SVGProps } from "react";

export function CatEars({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Left Ear */}
      <path d="M4 22 C6 14, 10 4, 16 2 C18 6, 20 14, 21 22 Z" />
      <path d="M7 20 C9 15, 11 8, 15 6 C16 9, 17 15, 18 20 Z" fill="var(--color-pink, #f6b9c9)" opacity="0.6" />
      {/* Right Ear */}
      <path d="M27 22 C28 14, 30 6, 32 2 C38 4, 42 14, 44 22 Z" />
      <path d="M30 20 C31 15, 32 9, 33 6 C37 8, 39 15, 41 20 Z" fill="var(--color-pink, #f6b9c9)" opacity="0.6" />
    </svg>
  );
}

export function Star({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* 4-point Y2K sparkle star */}
      <path d="M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24 C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0 Z" />
    </svg>
  );
}

export function Sparkle({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}

export function PawPrint({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <ellipse cx="6.5" cy="8.5" rx="2.5" ry="3.5" transform="rotate(-15 6.5 8.5)" />
      <ellipse cx="11" cy="5.5" rx="2.5" ry="3.5" transform="rotate(-5 11 5.5)" />
      <ellipse cx="15.5" cy="6" rx="2.5" ry="3.5" transform="rotate(10 15.5 6)" />
      <ellipse cx="19.5" cy="9.5" rx="2.5" ry="3.5" transform="rotate(20 19.5 9.5)" />
      <path d="M12 11.5 C8.5 11.5 5 14 6 18 C7 21 10 22 12.5 22 C15 22 18 21 19 18 C20 14 15.5 11.5 12 11.5 Z" />
    </svg>
  );
}

export function BowRibbon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <ellipse cx="8" cy="9" rx="7" ry="5" transform="rotate(-20 8 9)" />
      <ellipse cx="24" cy="9" rx="7" ry="5" transform="rotate(20 24 9)" />
      <circle cx="16" cy="10" r="3" />
      <path d="M14 12 C13 16 10 20 8 23 C10 21 14 19 15 14 Z" />
      <path d="M18 12 C19 16 22 20 24 23 C22 21 18 19 17 14 Z" />
    </svg>
  );
}
