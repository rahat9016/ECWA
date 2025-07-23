'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Turn as Hamburger } from 'hamburger-react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { PiShoppingCart } from 'react-icons/pi';
import { HiUser } from 'react-icons/hi2';
import { NavLinks } from '@/docs/navLinks';

const MobileNav = () => {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  const activeLabel = (() => {
    const currentLink = NavLinks.find((link) => link.href === pathname);
    if (pathname.includes('sister-concerns')) {
      return 'SISTER CONCERNS';
    }
    return currentLink ? currentLink.label : '/';
  })();

  return (
    <div>
      <div className="lg:hidden bg-navWhite fixed z-50 right-0 left-0 backdrop-blur-2xl text-white h-20 flex items-center justify-center">
        <div className="container px-4 w-full flex items-center justify-between">
          <div className="text-black">
            <Hamburger size={28} toggled={isOpen} toggle={setOpen} />
          </div>
          <Image src={'/logo.png'} alt="logo" height={100} width={120} />
          <div className="flex gap-5 text-black">
            <div className="flex flex-col gap-1 items-center justify-between relative">
              <div className="relative">
                <div className="absolute z-40 -right-1.5 top-0 h-4 w-4 text-xs text-white font-semibold flex justify-center items-center rounded-full bg-red-500">
                  6
                </div>
                <PiShoppingCart size={28} className="active:scale-90 duration-200" />
              </div>
              <p className="whitespace-nowrap font-medium text-xs">Cart</p>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-1 items-center justify-between relative">
                <div className="relative">
                  <HiUser size={28} className="active:scale-90 duration-200" />
                </div>
                <p className="whitespace-nowrap font-medium text-xs">Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
      <Sidebar isOpen={isOpen} setOpen={setOpen} activeLabel={activeLabel} mobile={true} />
    </div>
  );
};

export default MobileNav;
