'use client';

import { PanelLeftIcon } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-green-200 flex h-screen w-full">
      <div className="container flex flex-col relative border-2 border-yellow-500">
        <div className={`flex items-center h-16 w-full bg-white ${isOpen ? 'pl-64' : 'pl-16'}`}>
          <div className="flex items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
            <PanelLeftIcon />
            <h2 className="text-2xl font-semibold">Dashboard</h2>
          </div>
        </div>
        <div className={`absolute h-full bg-blue-500 ${isOpen ? 'w-3/12' : 'w-14'}`}>Hello</div>
        {/* <div className="flex">{children}</div> */}
      </div>
    </div>
  );
}
