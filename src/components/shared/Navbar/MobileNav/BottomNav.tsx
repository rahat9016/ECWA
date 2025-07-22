import React, { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { MdOutlineLocalFireDepartment, MdOutlineCardGiftcard, MdOutlineHome, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';

const navItems = [
  { label: 'Home', icon: <MdOutlineHome size={28} />, badge: null, badgePosition: '' },
  { label: 'Offers', icon: <MdOutlineCardGiftcard size={28} />, badge: 3, badgePosition: '-right-1' },
  { label: 'Hot Deals', icon: <MdOutlineLocalFireDepartment size={28} />, badge: 3, badgePosition: 'right-2' },
  { label: 'Wish List', icon: <IoMdHeartEmpty size={28} />, badge: 5, badgePosition: 'right-1.5' },
];

const BottomNav = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState('home');

  const isActive = (label:string) => selected === label.toLowerCase();

  return (
    <div>
      {/* Search Box */}
      <div
        className={`fixed z-50 flex items-center duration-200 top-20 w-full border-2 border-card shadow-md bg-white ${
          isSearchBoxOpen ? 'scale-100 h-12' : 'scale-0 h-0 pointer-events-none'
        }`}
      >
        <input
          placeholder="Search"
          className="text-black w-full px-4 h-full outline-0"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button
          className="group bg-green hover:bg-hGreen active:bg-hGreen duration-200 px-4 py-2"
          onClick={() => console.log(`Search: ${searchTerm}`)}
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
            onClick={() => setSelected(label.toLowerCase())}
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
