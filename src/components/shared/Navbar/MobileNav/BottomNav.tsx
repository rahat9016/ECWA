import React, { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { MdOutlineLocalFireDepartment, MdOutlineCardGiftcard } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineHome } from 'react-icons/md';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

const navItems = [
  {
    label: 'Home',
    icon: <MdOutlineHome size={28} />,
    badge: null,
  },
  {
    label: 'Offers',
    icon: <MdOutlineCardGiftcard size={28} />,
    badge: 3,
  },
  {
    label: 'Hot Deals',
    icon: <MdOutlineLocalFireDepartment size={28} />,
    badge: 3,
  },
  {
    label: 'Wish List',
    icon: <IoMdHeartEmpty size={28} />,
    badge: 5,
  },
];

const BottomNav = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchTerm,setSearchTerm] = useState("");
  const [selected, setSelected] = useState('home');

  console.log(searchTerm);
  
  return (
    <div>
      <div
        className={`fixed flex items-center duration-200 top-20  ${isSearchBoxOpen ? 'scale-100' : 'h-0 scale-0 pointer-events-none'} bg-white border-2 border-card shadow-md w-full h-12`}
      >
        <input placeholder="Search" className="text-black w-full px-4 h-full outline-0" onChange={(e)=>setSearchTerm(e.target.value)} />
        <div className="group bg-green hover:bg-hGreen active:bg-hGreen duration-200 px-4 py-2">
          <MdOutlineKeyboardDoubleArrowRight
            color="white"
            size={28}
            className="group-active:scale-90 duration-200"
          />
        </div>
      </div>
      <div className="lg:hidden z-40 fixed text-white bg-primary bottom-0 w-full flex items-center justify-between px-8 py-4 gap-5">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item.label.toLocaleLowerCase())}
            className={`flex flex-col gap-1 items-center justify-between relative ${selected === item.label.toLowerCase() ? 'text-green' : 'text-white'}`}
          >
            <div className={`${selected === item.label.toLowerCase() ? 'text-green' : 'text-black'}`}>
              {item.badge != null && (
                <div className="absolute text-white -right-1.5 top-0 h-4 w-4 text-xs font-semibold flex justify-center items-center rounded-full bg-red-500">
                  {item.badge}
                </div>
              )}
              {item.icon}
            </div>
            <p
              className={`whitespace-nowrap font-medium text-xs ${selected === item.label.toLowerCase() ? 'text-green' : 'text-black'} `}
            >
              {item.label}
            </p>
          </div>
        ))}
        <div
          className="text-black flex flex-col gap-1 items-center justify-between relative"
          onClick={() => {
            setIsSearchBoxOpen(!isSearchBoxOpen);
            setSelected('search');
          }}
        >
          <div className={`relative ${selected === 'search' ? 'text-green' : ''}`}>
            <FiSearch size={28} />
          </div>
          <p
            className={`whitespace-nowrap font-medium text-xs ${selected === 'search' ? 'text-green' : ''} `}
          >
            Search
          </p>
        </div>
        <div className={`fixed inset-0 top-32 bottom-20 duration-200 ${isSearchBoxOpen?'backdrop-blur-sm bg-black/10':'bg-transparent pointer-events-none'}`} onClick={()=>setIsSearchBoxOpen(false)}>

        </div>
      </div>
    </div>
  );
};

export default BottomNav;
