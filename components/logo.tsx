import React from "react";

const LogoSmile: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={35}
      height={35}
      role="img"
      aria-labelledby="title desc"
    >
      <title id="title">Smile Chat Logo</title>
      <desc id="desc">Rounded colorful logo with smile and charming eyes.</desc>

      {/* Dégradé principal */}
      <defs>
        <linearGradient id="gradSmile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34D399" />
          <stop offset="0.5" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {/* Fond circulaire */}
      <circle cx="100" cy="100" r="90" fill="url(#gradSmile)" />

      {/* Courbe smile */}
      <path
        d="M 60 120 Q 100 160 140 120"
        stroke="#fff"
        strokeWidth={8}
        strokeLinecap="round"
        fill="none"
      />

      {/* Nœuds connectés */}
      <circle cx="60" cy="120" r="8" fill="#fff" />
      <circle cx="100" cy="160" r="9" fill="#fff" />
      <circle cx="140" cy="120" r="8" fill="#fff" />

      {/* Yeux statiques */}
      {/* Oeil gauche (souriant) */}
      <path
        d="M 65 85 Q 75 75 85 85"
        stroke="#fff"
        strokeWidth={4}
        fill="none"
      />

      {/* Oeil droit (souriant) */}
      <path
        d="M 115 85 Q 125 75 135 85"
        stroke="#fff"
        strokeWidth={4}
        fill="none"
      />
    </svg>
  );
};

export default LogoSmile;
