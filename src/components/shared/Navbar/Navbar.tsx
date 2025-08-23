'use client';

import { useState } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav/MobileNav';

const Navbar = () => {
  return (
    <div>
      <DesktopNav />
      <MobileNav />
    </div>
  );
};

export default Navbar;
