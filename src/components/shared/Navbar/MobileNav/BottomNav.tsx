import React from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { PiShoppingCart } from 'react-icons/pi';
import { MdOutlineLocalFireDepartment, MdOutlineCardGiftcard } from 'react-icons/md';
import { Home } from 'lucide-react';

const navItems = [
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
    label: 'Home',
    icon: <Home size={28} />,
    badge: null,
  },
  {
    label: 'Wish List',
    icon: <IoMdHeartEmpty size={28} />,
    badge: 5,
  },
  {
    label: 'Cart',
    icon: <PiShoppingCart size={28} />,
    badge: 10,
  },
];

const BottomNav = () => {
  return (
    <div className="z-40 fixed text-white bg-primary bottom-0 w-full flex items-center justify-between px-8 py-4 gap-5">
      {navItems.map((item, index) => (
        <div key={index} className="flex flex-col items-center justify-between relative">
          <div className="relative">
            {item.badge != null && (
              <div className="absolute -right-1.5 top-0 h-4 w-4 text-xs font-semibold flex justify-center items-center rounded-full bg-red-500">
                {item.badge}
              </div>
            )}
            {item.icon}
          </div>
          <p className="whitespace-nowrap font-medium text-xs text-textGray">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
