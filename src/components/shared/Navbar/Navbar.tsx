'use client';
import { Heart, Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { LiaCartPlusSolid } from 'react-icons/lia';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav/MobileNav';


const Navbar = () => {
  const [isLoggedIn, setIsloggedin] = useState(false);


  return (
    <div>
      <div className='hidden lg:block '>
        <DesktopNav />
      </div>
      <div className='lg:hidden '>
        <MobileNav />
      </div>
    </div>
  );
};

export default Navbar;
