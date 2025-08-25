
import { SlidersHorizontal } from 'lucide-react';
import { RxCross2 } from 'react-icons/rx';
import { ScrollArea } from '../ui/scroll-area';
import ProductFilterContent from './ProductFilterContent';


const FilterSidebar = ({
  isFilterOpen,
  setIsFilterOpen,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  showInStockOnly,
  setShowInStockOnly,
  clearAllFilters,
  handleCategoryChange,
  handleBrandChange,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}: {
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (value: 'grid' | 'list') => void;
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (value: string[]) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  showInStockOnly: boolean;
  setShowInStockOnly: (value: boolean) => void;
  clearAllFilters: () => void;
  handleCategoryChange: (category: string, checked: boolean) => void;
  handleBrandChange: (brand: string, checked: boolean) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (value: string | null) => void;
}) => {
  return (
    <div>
      <div
        className={`absolute top-0 inset-0 ${isFilterOpen ? 'block' : 'hidden'} backdrop-blur-sm transition-opacity duration-300`}
        onClick={() => setIsFilterOpen(false)}
      />

      {/* Filter Sidebar with scrollable content */}
      <div
        className={`fixed z-50 right-0 top-20 h-full w-[60%] bg-white shadow-xl duration-300 ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Close filters"
            >
              <RxCross2 className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable filter content */}
          <ScrollArea className="flex-1 p-4">
            <ProductFilterContent
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              showInStockOnly={showInStockOnly}
              setShowInStockOnly={setShowInStockOnly}
              clearAllFilters={clearAllFilters}
              handleCategoryChange={handleCategoryChange}
              handleBrandChange={handleBrandChange}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
            />
          </ScrollArea>
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div
        onClick={() => setIsFilterOpen(true)}
        className={`fixed z-40 cursor-pointer lg:hidden flex items-center justify-center top-24 right-4 h-10 w-10 rounded-full bg-blue-700 text-white ${isFilterOpen ? 'hidden' : 'block'}`}
      >
        <SlidersHorizontal className="w-4 h-4" />
      </div>
    </div>
  );
};

export default FilterSidebar;
