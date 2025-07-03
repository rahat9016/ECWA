import { NavLinks } from '@/docs';
import { Plus } from 'lucide-react';


interface SidebarProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  activeLabel: string;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <div className="relative">
      <div
        className={`fixed top-20 inset-0 z-50 duration-200 ${props.isOpen ? 'backdrop-blur-xs' : 'bg-transparent pointer-events-none'}`}
        onClick={() => props.setOpen(false)}
      />
      <div
        className={`fixed z-50 ${props.isOpen ? 'translate-x-0' : '-translate-x-full'} duration-500 bg-white top-20 left-0 bottom-0 p-4 w-[70%]`}
      >
        <div className="flex flex-col gap-3">
          {NavLinks.map((category, index) => (
            <div
              key={index}
              className={`py-2 cursor-pointer text-white hover:text-textBlue hover:underline ${category.label === props.activeLabel ? 'bg-primary/20' : ''} duration-200`}
            >
              <div className="flex items-center justify-between font-semibold text-black px-3 w-full">
                {category.label}
                <Plus />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



// import React, { useEffect, useState } from 'react';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
// import { Plus, Minus } from 'lucide-react';

// export interface Category {
//   id: string;
//   label: string;
//   subCategories: {
//     label: string;
//     subSubCategories: string[];
//   }[];
// }

// export const Categories: Category[] = [
//   {
//     id: 'electronics',
//     label: 'Electronics',
//     subCategories: [
//       {
//         label: 'Mobiles',
//         subSubCategories: ['Smartphones', 'Feature Phones', 'Accessories']
//       },
//       {
//         label: 'Laptops',
//         subSubCategories: ['Gaming Laptops', 'Ultrabooks', 'Accessories']
//       }
//     ]
//   },
//   {
//     id: 'fashion',
//     label: 'Fashion',
//     subCategories: [
//       {
//         label: 'Men',
//         subSubCategories: ['Shirts', 'Jeans', 'Shoes']
//       },
//       {
//         label: 'Women',
//         subSubCategories: ['Dresses', 'Tops', 'Footwear']
//       }
//     ]
//   },
//   {
//     id: 'home',
//     label: 'Home & Living',
//     subCategories: [
//       {
//         label: 'Furniture',
//         subSubCategories: ['Sofas', 'Beds', 'Tables']
//       },
//       {
//         label: 'Decor',
//         subSubCategories: ['Wall Art', 'Lamps', 'Curtains']
//       }
//     ]
//   }
// ];

// interface SidebarProps {
//   isOpen: boolean;
//   setOpen: (open: boolean) => void;
//   activeLabel: string;
// }

// const Sidebar = ({ isOpen, setOpen, activeLabel }: SidebarProps) => {
//   const [openCategory, setOpenCategory] = useState<string | null>(null);

//   useEffect(() => {
//     if (isOpen) {
//       const parent = Categories.find(cat =>
//         cat.subCategories.some(sub =>
//           sub.subSubCategories.includes(activeLabel) || sub.label === activeLabel
//         )
//       );
//       setOpenCategory(parent?.id || null);
//     } else {
//       setOpenCategory(null);
//     }
//   }, [isOpen, activeLabel]);

//   return (
//     <div className="relative">
//       <div
//         className={`fixed top-20 inset-0 z-50 duration-200 ${isOpen ? 'backdrop-blur-xs' : 'bg-transparent pointer-events-none'}`}
//         onClick={() => setOpen(false)}
//       />
//       <div
//         className={`fixed z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} duration-500 bg-white top-20 left-0 bottom-0 p-4 w-[70%] overflow-y-auto`}
//       >
//         <Accordion type="single" collapsible value={openCategory || undefined}>
//           {Categories.map(category => {
//             const isActiveCategory = category.id === openCategory;
//             const activeSub = category.subCategories.find(sub =>
//               sub.subSubCategories.includes(activeLabel) || sub.label === activeLabel
//             );

//             return (
//               <AccordionItem key={category.id} value={category.id} className={isActiveCategory ? 'bg-primary/10 rounded-md' : ''}>
//                 <AccordionTrigger
//                   onClick={() => setOpenCategory(category.id === openCategory ? '' : category.id)}
//                   className="flex justify-between items-center px-3 py-2 font-semibold text-black hover:text-textBlue"
//                 >
//                   {category.label}
//                   {isActiveCategory ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   {category.subCategories.map((sub, i) => (
//                     <div key={i} className="pl-4">
//                       <p className={`font-medium ${activeLabel === sub.label ? 'text-primary' : ''}`}>{sub.label}</p>
//                       <ul className="pl-4 list-disc text-sm">
//                         {sub.subSubCategories.map((item, idx) => (
//                           <li key={idx} className={`${activeLabel === item ? 'text-primary' : ''}`}>{item}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//                 </AccordionContent>
//               </AccordionItem>
//             );
//           })}
//         </Accordion>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
