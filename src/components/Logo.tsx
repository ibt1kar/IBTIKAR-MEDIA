import React from 'react';

interface LogoProps {
  className?: string;
  imgClassName?: string;
  secondPartClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSecondPart?: boolean;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  imgClassName = '',
  secondPartClassName = '',
  size = 'md',
  showSecondPart = true,
}) => {
  const sizeMap = {
    sm: {
      icon: 'h-8 sm:h-9 max-w-[100px]',
      second: 'h-8 sm:h-9 max-w-[160px]',
      gap: 'gap-2',
    },
    md: {
      icon: 'h-11 sm:h-14 max-w-[140px]',
      second: 'h-11 sm:h-14 max-w-[220px]',
      gap: 'gap-2.5 sm:gap-3',
    },
    lg: {
      icon: 'h-16 sm:h-20 max-w-[200px]',
      second: 'h-16 sm:h-20 max-w-[300px]',
      gap: 'gap-3 sm:gap-4',
    },
    xl: {
      icon: 'h-20 sm:h-24 max-w-[220px]',
      second: 'h-20 sm:h-24 max-w-[340px]',
      gap: 'gap-3 sm:gap-4',
    },
  }[size];

  return (
    <div className={`flex items-center ${sizeMap.gap} ${className}`}>
      {/* Official Uploaded Logo Part 1 (Emblem / Icon) */}
      <img
        src="/logo.png"
        alt="شعار ابتكار - الجزء الأول"
        className={`${imgClassName || sizeMap.icon} w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 select-none`}
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (!target.src.includes('لوجو.png')) {
            target.src = '/لوجو.png';
          }
        }}
      />

      {/* Official Uploaded Logo Part 2 (Wordmark / Second Part) */}
      {showSecondPart && (
        <img
          src="/logo1.png"
          alt="شعار ابتكار - الجزء الثاني"
          className={`${secondPartClassName || sizeMap.second} w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 select-none`}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (!target.src.includes('لوجو1.png')) {
              target.src = '/لوجو1.png';
            }
          }}
        />
      )}
    </div>
  );
};






