import React from 'react';

interface StickySidebarProps {
  children: React.ReactNode;
  className?: string;
  top?: string;
  width?: string;
}

const StickySidebar: React.FC<StickySidebarProps> = ({ 
  children, 
  className = "", 
  top = "top-4", 
  width = "w-80" 
}) => {
  return (
    <aside className={`lg:flex-shrink-0 ${width}`}>
      <div className={`sticky ${top} ${className}`}>
        {children}
      </div>
    </aside>
  );
};

export default StickySidebar;
