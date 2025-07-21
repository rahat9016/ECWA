'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { CATEGORIES } from '@/docs/categories';
import Carousel from './Carousel';

const Hero = () => {


  const images = [
    "/hero/hero1/1.png",
    "/hero/hero1/2.png",
    "/hero/hero1/3.png",
    "/hero/hero1/4.png",
  ]




  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [openSubCategories, setOpenSubCategories] = useState<Record<string, boolean>>({});
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<{
    category: string;
    subCategory: string;
    brand: string;
  }>({
    category: '',
    subCategory: '',
    brand: '',
  });

  console.log(isOpen);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className=" lg:container px-4 w-full ">
        <div className="w-80 border-2 border-red-500 px-2 py-5 h-screen fixed top-24 bottom-0 overflow-auto">          
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
                              isSubCategoryActive ? 'text-black' : 'text-black hover:text-blue-500',
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
                            {isSubCatOpen ? (
                              <IoIosArrowUp size={20} />
                            ) : (
                              <IoIosArrowDown size={20} />
                            )}
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
                                    setOpen(false);
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
        <div className="w-full pl-80 bg-violet-300">
          <div className='h-screen border-2 border-black py-5 px-3 flex flex-col gap-5'>
            <div className='bg-white w-full h-96'>
              <Carousel images={images} />
            </div>
            <div className='flex gap-5 w-full h-72'>
              <div className='bg-sky-500 w-full'>Left</div>
              <div className='bg-sky-500 w-full'>Right</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

const toggle = (
  stateSetter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  key: string,
) => {
  stateSetter((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);



