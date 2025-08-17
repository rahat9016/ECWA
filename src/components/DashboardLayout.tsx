'use client';

import { SidebarItems } from '@/docs/dashboard';
import { PanelLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { CapFirstLetter } from '@/lib/utils';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('/');
  const pathName = usePathname();
  const segments = pathName.split('/').filter(Boolean); // remove empty segments
  const userType = segments[0];
  const breadcrumbItems = segments.map((segment, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    return {
      href,
      label: CapFirstLetter(segment),
    };
  });

  return (
    <div className="bg-white flex w-full">
      <div className="container flex flex-col w-full">
        <div className="hidden lg:flex relative">
          <div
            className={`h-full bg-white border-r border-gray-200 duration-300 ${sidebarOpen ? 'w-3/12' : 'w-18'}`}
          >
            <div className="sticky z-50 top-24">
              <div
                className={`h-16 p-3 overflow-hidden flex items-center ${sidebarOpen ? '' : 'justify-center'} gap-3`}
              >
                <h3 className="h-11 w-11  shrink-0 rounded-sm flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  N
                </h3>
                <p className={`font-semibold ${sidebarOpen ? '' : 'hidden'}`}>Navigation</p>
              </div>
              <div className="mt-6 px-3  flex flex-col gap-3">
                {SidebarItems.map((item) => (
                  <Link
                    href={`/${userType}/${item.name}`}
                    key={item.label}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center ${sidebarOpen ? '' : 'justify-center'} gap-3 p-3 cursor-pointer text-left rounded-lg transition-colors ${activeTab === item.name ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <div>{item.icon}</div>
                    <p className={`${sidebarOpen ? '' : 'hidden'}`}>{item.label}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div
              className={`sticky top-24 z-50 border-b border-gray-200 flex items-center h-16 w-full bg-white`}
            >
              <div className="px-6 cursor-pointer flex items-center gap-2">
                <div
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="hover:bg-gray-200 p-2 rounded-sm duration-300"
                >
                  <PanelLeftIcon size={20} />
                </div>
                <div className="w-1 h-6 rounded-sm bg-gray-300" />
                <div className="text-2xl font-semibold">
                  <Breadcrumb>
                    <BreadcrumbList>
                      {breadcrumbItems.map((item, idx) => (
                        <BreadcrumbItem key={item.href}>
                          {idx === breadcrumbItems.length - 1 ? (
                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                          ) : (
                            <>
                              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                              <BreadcrumbSeparator />
                            </>
                          )}
                        </BreadcrumbItem>
                      ))}
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
            </div>
            <div className="flex">{children}</div>
          </div>
        </div>
        <div className="lg:hidden">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
