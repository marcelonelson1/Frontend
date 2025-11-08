import React from 'react';

interface LoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'md', text, className = '' }) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const borderClasses = {
    xs: 'border-2',
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-4',
    xl: 'border-4',
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const spacing = size === 'xs' || size === 'sm' ? 'space-y-1' : 'space-y-2';

  return (
    <div className={`flex flex-col items-center justify-center ${spacing} ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className={`w-full h-full ${borderClasses[size]} border-gray-200 border-t-primary-600 rounded-full`}></div>
      </div>
      {text && (
        <p className={`${textSizes[size]} text-gray-600 text-center truncate max-w-full`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Full page loading component
export const FullPageLoading: React.FC<{ text?: string }> = ({ text = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <Loading size="lg" text={text} className="max-w-xs sm:max-w-sm" />
      </div>
    </div>
  );
};

// Inline loading spinner
export const InlineLoading: React.FC<{ size?: 'xs' | 'sm' }> = ({ size = 'sm' }) => {
  return <Loading size={size} />;
};

export default Loading;