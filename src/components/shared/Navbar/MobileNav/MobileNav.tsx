'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Image from 'next/image';
import { useState } from 'react';
import { Turn as Hamburger } from 'hamburger-react';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { NavLinks } from '@/docs';




const MobileNav = () => {
  const [isOpen, setOpen] = useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const pathname = usePathname();

  const activeLabel = (() => {
    const currentLink = NavLinks.find((link) => link.href === pathname);
    if (pathname.includes('sister-concerns')) {
      return 'SISTER CONCERNS';
    }
    return currentLink ? currentLink.label : '/';
  })();
  return (
    <>
      <div className="fixed right-0 left-0 bg-primary text-white h-20 flex items-center justify-center">
        <div className="lg:container px-4 w-full flex items-center justify-between gap-20">
          <div className="">
            <Hamburger size={28} toggled={isOpen} toggle={setOpen} />
          </div>
          <Image src={'/logo.png'} alt="logo" height={100} width={120} />
          <div
            className="flex items-center gap-5 p-2 rounded-full"
            onClick={() => setIsSearchBoxOpen(!isSearchBoxOpen)}
          >
            <FiSearch
              size={28}
              color={isSearchBoxOpen ? '#EE485C' : ''}
              className="active:scale-90 duration-200"
            />
          </div>
        </div>
        <div
          className={`fixed flex items-center duration-200 top-20  ${isSearchBoxOpen ? 'scale-100' : 'h-0 scale-0 pointer-events-none'} bg-white border-2 border-card shadow-md w-full h-12`}
        >
          <input placeholder="Search" className="text-black w-full px-4 h-full outline-0" />
          <div className="group bg-green hover:bg-hGreen active:bg-hGreen duration-200 px-4 py-2">
            <MdOutlineKeyboardDoubleArrowRight
              size={28}
              className="group-active:scale-90 duration-200"
            />
          </div>
        </div>
      </div>
      <BottomNav />
      <Sidebar isOpen={isOpen} setOpen={setOpen} activeLabel={activeLabel}></Sidebar>
    </>
  );
};

export default MobileNav;
