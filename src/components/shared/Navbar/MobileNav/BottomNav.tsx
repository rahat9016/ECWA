import React, { useRef, useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import {
  MdOutlineLocalFireDepartment,
  MdOutlineCardGiftcard,
  MdOutlineHome,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';

const navItems = [
  { label: 'Home', icon: <MdOutlineHome size={28} />, badge: null, badgePosition: '' },
  {
    label: 'Offers',
    icon: <MdOutlineCardGiftcard size={28} />,
    badge: 3,
    badgePosition: '-right-1',
  },
  {
    label: 'Hot Deals',
    icon: <MdOutlineLocalFireDepartment size={28} />,
    badge: 3,
    badgePosition: 'right-2',
  },
  { label: 'Wish List', icon: <IoMdHeartEmpty size={28} />, badge: 5, badgePosition: 'right-1.5' },
];

const BottomNav = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const isActive = (label: string) => selected === label.toLowerCase();
  const [selected, setSelected] = useState('home');
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    // if (!searchTerm.trim()) return;
    setIsSearchBoxOpen(false);
    router.push(`/products?search=${searchTerm}`);
  };

  return (
    <div>
      {/* Search Box */}
      <div
        className={`fixed z-50 flex items-center duration-200 top-20 w-full border-2 border-card shadow-md bg-white ${
          isSearchBoxOpen ? 'scale-100 h-12' : 'scale-0 h-0 pointer-events-none'
        }`}
      >
        <div className="relative w-full">
          <input
            ref={inputRef}
            placeholder="Search"
            className="text-black w-full px-4 h-full outline-0"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            value={searchTerm}
          />
          <div
            onClick={() => {
              setSearchTerm('');
              inputRef.current?.focus();
              router.push('/products');
            }}
            className={`${!searchTerm ? 'hidden' : 'block'} cursor-pointer absolute right-2 rounded-full top-1/2 -translate-y-1/2 p-1 duration-300 hover:bg-red-400 flex items-center justify-center`}
          >
            <RxCross2 />
          </div>
        </div>

        <button
          className="group bg-green hover:bg-hGreen active:bg-hGreen duration-200 px-4 py-2"
          onClick={() => handleSearch()}
          disabled={!searchTerm.trim()}
        >
          <MdOutlineKeyboardDoubleArrowRight
            color="white"
            size={28}
            className="group-active:scale-90 duration-200"
          />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="lg:hidden z-40 fixed text-white bg-base bottom-0 w-full flex items-center justify-between px-8 py-4 gap-5">
        {navItems.map(({ label, icon, badge, badgePosition }) => (
          <div
            key={label}
            onClick={() => {
              setSelected(label.toLowerCase());
              if (isSearchBoxOpen) setIsSearchBoxOpen(false);
              router.push(label === 'Home' ? '/' : `/${label.toLowerCase().replace(' ', '-')}`);
            }}
            className={`flex flex-col gap-1 items-center justify-between relative ${
              isActive(label) ? 'text-green' : 'text-white'
            }`}
          >
            <div className={isActive(label) ? 'text-green' : 'text-black'}>
              {badge != null && (
                <span
                  className={`absolute text-white top-0 h-4 w-4 text-xs font-semibold flex justify-center items-center rounded-full bg-red-500 ${badgePosition}`}
                >
                  {badge}
                </span>
              )}
              {icon}
            </div>
            <p
              className={`whitespace-nowrap font-medium text-xs ${
                isActive(label) ? 'text-green' : 'text-black'
              }`}
            >
              {label}
            </p>
          </div>
        ))}

        {/* Search Icon */}
        <div
          className="text-black flex flex-col gap-1 items-center justify-between relative"
          onClick={() => {
            setIsSearchBoxOpen(!isSearchBoxOpen);
            setSelected('search');
            inputRef.current?.focus();
          }}
        >
          <div className={`relative ${isActive('search') ? 'text-green' : ''}`}>
            <FiSearch size={28} />
          </div>
          <p
            className={`whitespace-nowrap font-medium text-xs ${
              isActive('search') ? 'text-green' : ''
            }`}
          >
            Search
          </p>
        </div>
      </div>

      {/* Overlay */}
      {isSearchBoxOpen && (
        <div
          className="fixed z-50 inset-0 top-32 bottom-20 backdrop-blur-sm bg-black/10 duration-200"
          onClick={() => setIsSearchBoxOpen(false)}
        />
      )}
    </div>
  );
};

export default BottomNav;
