"use client"
import { useState } from 'react';
import clsx from 'clsx';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { CATEGORIES } from '@/docs/categories';

interface SidebarProps {
  isOpen?: boolean;
  setOpen?: (open: boolean) => void;
  activeLabel?: string;
  mobile?: boolean;
  className?: string;
}

const Sidebar = ({ 
  isOpen = true, 
  setOpen = () => {}, 
  mobile = false,
  className = '' 
}: SidebarProps) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [openSubCategories, setOpenSubCategories] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<{
    category: string;
    subCategory: string;
    brand: string;
  }>({
    category: '',
    subCategory: '',
    brand: '',
  });

  const toggle = (
    stateSetter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    key: string,
  ) => {
    stateSetter((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={clsx("relative", className)}>
      {/* Mobile Backdrop */}
      {mobile && (
        <div
          className={clsx(
            'lg:hidden fixed top-20 inset-0 z-40 transition duration-200',
            isOpen ? 'backdrop-blur-sm bg-black/20' : 'pointer-events-none bg-transparent',
          )}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div
        className={clsx(
          mobile ? 'lg:hidden fixed z-50 top-20 left-0 bottom-0 w-[70%]' : 'relative',
          'backdrop-blur-2xl p-4 overflow-y-auto',
          mobile ? 'transition-transform duration-500' : '',
          mobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : '',
        )}
      >
        <div className="flex flex-col">
          {CATEGORIES.map((category) => {
            const isCategoryOpen = openCategories[category.name];
            const isCategoryActive = selected.category === category.name;

            return (
              <div key={category.name} className="cursor-pointer">
                <div className="flex flex-col text-gray-800 font-semibold">
                  {/* Category Header */}
                  <div
                    className={clsx(
                      'py-2 flex items-center justify-between w-full transition-colors',
                      isCategoryActive ? 'text-blue-600' : 'hover:text-blue-600',
                    )}
                    onClick={() => {
                      toggle(setOpenCategories, category.name);
                      setSelected({ category: category.name, subCategory: '', brand: '' });
                    }}
                  >
                    <div className="flex gap-2">
                      <category.icon size={24} />
                      {capitalize(category.name)}
                    </div>
                    {isCategoryOpen ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
                  </div>

                  {/* Subcategories */}
                  <div
                    className={clsx(
                      'overflow-hidden transition-all duration-300 ease-in-out border-l-2 border-bdrGray ml-2',
                      isCategoryOpen ? 'max-h-[500px] py-2' : 'max-h-0',
                    )}
                  >
                    {category.types.map((subCat) => {
                      const isSubCatOpen = openSubCategories[subCat.type];
                      const isSubCategoryActive =
                        selected.category === category.name && selected.subCategory === subCat.type;

                      return (
                        <div key={subCat.type} className="ml-3">
                          {/* Subcategory Header */}
                          <div
                            className={clsx(
                              'pl-3 flex items-center justify-between w-full transition-colors',
                              isSubCategoryActive
                                ? 'text-black'
                                : 'text-black hover:text-blue-500',
                            )}
                            onClick={() => {
                              toggle(setOpenSubCategories, subCat.type);
                              setSelected({
                                category: category.name,
                                subCategory: subCat.type,
                                brand: '',
                              });
                            }}
                          >
                            {subCat.type}
                            {isSubCatOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
                          </div>

                          {/* Brands */}
                          <div
                            className={clsx(
                              'overflow-hidden transition-all duration-300 ease-in-out border-l-2 border-bdrGray ml-3',
                              isSubCatOpen ? 'max-h-[300px] py-1' : 'max-h-0',
                            )}
                          >
                            {subCat.brands.map((brand) => {
                              const isBrandActive =
                                selected.category === category.name &&
                                selected.subCategory === subCat.type &&
                                selected.brand === brand;

                              return (
                                <div
                                  key={brand}
                                  onClick={() => {
                                    setSelected({
                                      category: category.name,
                                      subCategory: subCat.type,
                                      brand,
                                    });
                                    if (mobile) setOpen(false);
                                  }}
                                  className={clsx(
                                    'pl-3 ml-3 rounded-lg py-1 transition-colors cursor-pointer',
                                    isBrandActive
                                      ? 'text-black bg-textGray'
                                      : 'text-cardGray hover:text-blue-400',
                                  )}
                                >
                                  {brand}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper to capitalize the first letter
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export default Sidebar;