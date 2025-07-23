import React from 'react';

interface StickySidebarProps {
  children: React.ReactNode;
  className?: string;
  top?: string;
  width?: string;
  offset?: number;
  speed?: number;
}

const StickySidebar: React.FC<StickySidebarProps> = ({ 
  children, 
  className = "", 
  top = "top-4", 
  width = "w-80",
  // offset and speed are kept for backwards compatibility but not used
  offset = 0,
  speed = 0.1
}) => {
  return (
    <div className={`${width} relative`}>
      <div 
        className={`sticky ${top} ${className}`}
        style={{ 
          position: 'sticky',  // Explicit inline style to ensure stickiness
          height: 'fit-content',
          maxHeight: '100vh',
          overflowY: 'auto'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default StickySidebar;