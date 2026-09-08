import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { img: 'h-9 sm:h-10 max-w-[140px]' },
    md: { img: 'h-11 sm:h-13 max-w-[180px]' },
    lg: { img: 'h-16 sm:h-20 max-w-[240px]' },
    xl: { img: 'h-24 sm:h-28 max-w-[320px]' },
  }[size];

  return (
    <div className={`flex items-center ${className}`}>
      {/* Official Uploaded Logo from /public/logo.png */}
      <img
        src="/logo.png"
        alt="شعار ابتكار الرسمي"
        className={`${sizeMap.img} w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none`}
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};





