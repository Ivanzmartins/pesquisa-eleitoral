import React from 'react';
import UploadButton from './UploadButton';
import RefreshButton from './RefreshButton';
import NavbarLayout from './NavbarLayout';

interface NavbarProps {
  onRefresh: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRefresh }) => {
  return (
    <NavbarLayout>
      <UploadButton onUploadSuccess={onRefresh} />
      <div className="mt-200px">
        <RefreshButton onRefresh={onRefresh} />
      </div>

    </NavbarLayout>
  );
};

export default Navbar;
