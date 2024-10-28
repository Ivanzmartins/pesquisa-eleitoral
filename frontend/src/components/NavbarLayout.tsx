import React from 'react';

interface NavbarLayoutProps {
  children: React.ReactNode;
}

const NavbarLayout: React.FC<NavbarLayoutProps> = ({ children }) => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="flex flex-col items-start">
        {children}
      </div>
    </nav>
  );
};

export default NavbarLayout;
