'use client';

import { Heart, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PiShoppingCart } from 'react-icons/pi';
import { LuUserRoundPlus } from 'react-icons/lu';

const DesktopNav = () => {
  const [isLoggedIn, setIsloggedin] = useState(false);

  return (
    <div className="hidden fixed z-50 right-0 left-0 lg:flex bg-base text-white h-24  items-center justify-center">
      <div className="container px-4 w-full flex items-center justify-between gap-16">
        <Link href="/" className='w-96 flex items-center justify-center cursor-pointer'>
          <Image className="h-12 w-full" src={'/logo.png'} alt="logo" height={120} width={160} />
        </Link>
        <div className="group w-full bg-bdrGray flex items-center pl-4 rounded-lg">
          <input placeholder="Search" className="h-12 text-gray-800 pr-4 w-full outline-none" />
          <div className="bg-bgWhite font-medium duration-200 p-2 mr-0.5 rounded-r-lg px-5 lg:px-10 cursor-pointer">
            <Search
              size={28}
              color="gray"
              className="group-hover:scale-110 group-active:scale-95 duration-200"
            />
          </div>
        </div>
        <div className="flex items-center gap-5 text-black">
          <Link href="/wish-list" className="cursor-pointer flex items-center gap-2">
            <div className="relative">
              <div className="absolute text-white -right-1.5 -top-1 h-4 w-4 text-xs font-semibold flex justify-center items-center rounded-full bg-red-500">
                3
              </div>
              <Heart size={28} />
            </div>
            <p className="hidden lg:block whitespace-nowrap font-medium">Wish List</p>
          </Link>
          <Link href="/cart" className="cursor-pointer flex items-center gap-2">
            <div className="relative">
              <div className="absolute text-white -right-1.5 top-.5 h-4 w-4 text-xs font-semibold flex justify-center items-center rounded-full bg-red-500">
                3
              </div>
              <PiShoppingCart size={30} />
            </div>
            <p className="hidden lg:block whitespace-nowrap font-medium">Cart</p>
          </Link>
          <div onClick={() => setIsloggedin(!isLoggedIn)}>
            {isLoggedIn ? (
              <div className="w-10 h-10 rounded-full overflow-hidden object-cover">
                <Image src="/user.webp" alt="profile" height={40} width={40} />
              </div>
            ) : (
              <Link href="/login" className="cursor-pointer flex items-center gap-2">
                <div className="relative">
                  <LuUserRoundPlus size={28} />
                </div>
                <div>
                  <p className="hidden lg:block whitespace-nowrap font-medium">Account</p>
                  <p className="whitespace-nowrap text-xs">Register or login</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
