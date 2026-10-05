import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <>
      {/* Fixed Full-screen Grid Layer with Radial Mask */}
      <div className="bg-grid-layer" aria-hidden="true" />

      {/* Fixed Full-screen Animated Curved Lines SVG */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden will-change-transform"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="pipe-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Path 1: Sweeping flowing wave across upper-mid */}
        <path
          d="M -100 240 C 400 40, 800 580, 1350 280 C 1650 120, 1850 380, 2050 320"
          stroke="rgba(99, 102, 241, 0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#pipe-glow)"
        />
        <path
          d="M -100 240 C 400 40, 800 580, 1350 280 C 1650 120, 1850 380, 2050 320"
          stroke="#7C7CFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="40 260"
          className="flow-pipe-1"
          filter="url(#pipe-glow)"
        />

        {/* Path 2: Flowing wave through center-bottom (accent coral) */}
        <path
          d="M -50 780 C 350 920, 720 420, 1150 720 C 1520 980, 1820 620, 2050 740"
          stroke="rgba(99, 102, 241, 0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#pipe-glow)"
        />
        <path
          d="M -50 780 C 350 920, 720 420, 1150 720 C 1520 980, 1820 620, 2050 740"
          stroke="#EF4A3C"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="40 260"
          className="flow-pipe-2"
          filter="url(#pipe-glow)"
        />

        {/* Path 3: S-curve flowing diagonally from top-right to bottom-left */}
        <path
          d="M 2000 120 C 1550 60, 1320 480, 950 460 C 580 440, 320 840, -50 920"
          stroke="rgba(99, 102, 241, 0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#pipe-glow)"
        />
        <path
          d="M 2000 120 C 1550 60, 1320 480, 950 460 C 580 440, 320 840, -50 920"
          stroke="#7C7CFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="40 260"
          className="flow-pipe-3"
          filter="url(#pipe-glow)"
        />

        {/* Path 4: High gentle arc curve near top */}
        <path
          d="M -80 140 C 480 320, 1050 -20, 1580 180 C 1820 280, 1960 160, 2050 190"
          stroke="rgba(99, 102, 241, 0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#pipe-glow)"
        />
        <path
          d="M -80 140 C 480 320, 1050 -20, 1580 180 C 1820 280, 1960 160, 2050 190"
          stroke="#7C7CFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="40 260"
          className="flow-pipe-4"
          filter="url(#pipe-glow)"
        />

        {/* Path 5: Deep lower undulating wave (accent coral) */}
        <path
          d="M -60 880 C 450 660, 960 1020, 1420 810 C 1720 680, 1920 920, 2050 890"
          stroke="rgba(99, 102, 241, 0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#pipe-glow)"
        />
        <path
          d="M -60 880 C 450 660, 960 1020, 1420 810 C 1720 680, 1920 920, 2050 890"
          stroke="#EF4A3C"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="40 260"
          className="flow-pipe-5"
          filter="url(#pipe-glow)"
        />

        {/* Concentric Arc 1: Top-Right Arc */}
        <path
          d="M 1270 180 A 380 380 0 1 0 2030 180"
          stroke="rgba(99, 102, 241, 0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#pipe-glow)"
        />
        <path
          d="M 1270 180 A 380 380 0 1 0 2030 180"
          stroke="#7C7CFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="40 260"
          className="flow-pipe-arc1"
          filter="url(#pipe-glow)"
        />

        {/* Concentric Arc 2: Larger Top-Right Arc */}
        <path
          d="M 1070 180 A 580 580 0 1 0 2230 180"
          stroke="rgba(99, 102, 241, 0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#pipe-glow)"
        />
        <path
          d="M 1070 180 A 580 580 0 1 0 2230 180"
          stroke="#7C7CFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="40 260"
          className="flow-pipe-arc2"
          filter="url(#pipe-glow)"
        />

        {/* Concentric Arc 3: Bottom-Left Arc */}
        <path
          d="M 280 460 A 420 420 0 0 1 700 880"
          stroke="rgba(99, 102, 241, 0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#pipe-glow)"
        />
        <path
          d="M 280 460 A 420 420 0 0 1 700 880"
          stroke="#7C7CFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="40 260"
          className="flow-pipe-arc3"
          filter="url(#pipe-glow)"
        />
      </svg>
    </>
  );
};
