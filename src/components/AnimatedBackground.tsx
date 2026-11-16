import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="ib-backdrop" aria-hidden="true">
      <div className="grid" />
      <div className="ib-glow indigo" style={{ top: '-6%', right: '-14%' }} />
      <div className="ib-glow coral" style={{ top: '4%', left: '-16%' }} />
      <div className="ib-glow coral" style={{ top: '19%', right: '-18%' }} />
      <div className="ib-glow indigo" style={{ top: '34%', left: '-18%' }} />
      <div className="ib-glow indigo" style={{ top: '50%', right: '-16%' }} />
      <div className="ib-glow coral" style={{ top: '62%', left: '-14%' }} />
      <div className="ib-glow coral" style={{ top: '78%', right: '-14%' }} />
      <div className="ib-glow indigo" style={{ bottom: '-6%', left: '-12%' }} />
    </div>
  );
};
