export function SamiFlag({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red section (top left) */}
      <rect x="0" y="0" width="18" height="24" fill="#D81E05" />
      
      {/* Green section (bottom left) */}
      <rect x="0" y="24" width="18" height="24" fill="#008542" />
      
      {/* Yellow section (top right) */}
      <rect x="30" y="0" width="18" height="24" fill="#FECB00" />
      
      {/* Blue section (bottom right) */}
      <rect x="30" y="24" width="18" height="24" fill="#003C88" />
      
      {/* Blue circle background */}
      <circle cx="24" cy="24" r="10" fill="#003C88" />
      
      {/* Red circle in center */}
      <circle cx="24" cy="24" r="6" fill="#D81E05" />
    </svg>
  );
}
