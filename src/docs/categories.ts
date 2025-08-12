
import { MdOutlinePhoneAndroid, MdOutlineSportsSoccer, MdOutlineDirectionsCar, MdOutlineHome, MdOutlineBook, MdOutlineFace } from 'react-icons/md';

export const CATEGORIES = [
  {
    name: 'electronics',
    icon: MdOutlinePhoneAndroid,
    types: [
      { 
        type: 'Smartphones', 
        brands: ['Samsung', 'Apple', 'Xiaomi', 'OnePlus', 'Google', 'Huawei', 'Oppo', 'Vivo'] 
      },
      { 
        type: 'Laptops & Computers', 
        brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Microsoft'] 
      },
      { 
        type: 'Audio & Headphones', 
        brands: ['Sony', 'Bose', 'Apple', 'Sennheiser', 'JBL', 'Beats', 'Audio-Technica', 'Skullcandy'] 
      },
      { 
        type: 'Cameras & Photography', 
        brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'Olympus', 'GoPro', 'DJI'] 
      },
      { 
        type: 'Smartwatches & Wearables', 
        brands: ['Apple', 'Samsung', 'Fitbit', 'Garmin', 'Fossil', 'Amazfit', 'Polar', 'Suunto'] 
      },
    ],
  },
  {
    name: 'fashion',
    icon: MdOutlineFace,
    types: [
      { 
        type: "Men's Clothing", 
        brands: ['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', 'Ralph Lauren', 'Tommy Hilfiger', 'Calvin Klein'] 
      },
      { 
        type: "Women's Clothing", 
        brands: ['Zara', 'H&M', 'Forever 21', 'Mango', 'Uniqlo', "Victoria's Secret", 'Gap', "Levi's"] 
      },
      { 
        type: 'Shoes & Footwear', 
        brands: ['Nike', 'Adidas', 'Puma', 'Converse', 'Vans', 'New Balance', 'Reebok', 'Under Armour'] 
      },
      { 
        type: 'Accessories', 
        brands: ['Michael Kors', 'Coach', 'Kate Spade', 'Fossil', 'Ray-Ban', 'Oakley', 'Gucci', 'Prada'] 
      },
    ],
  },
  {
    name: 'home',
    icon: MdOutlineHome,
    types: [
      { 
        type: 'Furniture', 
        brands: ['IKEA', 'Ashley', 'Wayfair', 'West Elm', 'CB2', 'Pottery Barn', 'Crate & Barrel', 'Room & Board'] 
      },
      { 
        type: 'Lighting', 
        brands: ['Philips', 'IKEA', 'West Elm', 'CB2', 'Artemide', 'Flos', 'Tom Dixon', 'Muuto'] 
      },
      { 
        type: 'Kitchen & Dining', 
        brands: ['KitchenAid', 'Cuisinart', 'Ninja', 'Instant Pot', 'Breville', 'All-Clad', 'Le Creuset', 'OXO'] 
      },
      { 
        type: 'Home Decor', 
        brands: ['West Elm', 'CB2', 'Pottery Barn', 'Anthropologie', 'Urban Outfitters', 'Target', 'HomeGoods', 'Wayfair'] 
      },
    ],
  },
  {
    name: 'gaming',
    icon: MdOutlineSportsSoccer,
    types: [
      { 
        type: 'Gaming Consoles', 
        brands: ['Sony', 'Microsoft', 'Nintendo', 'Steam', 'Valve', 'Atari', 'Sega', 'Retro-Bit'] 
      },
      { 
        type: 'PC Gaming', 
        brands: ['NVIDIA', 'AMD', 'Intel', 'Corsair', 'Razer', 'Logitech', 'SteelSeries', 'ASUS'] 
      },
      { 
        type: 'Gaming Accessories', 
        brands: ['Razer', 'Logitech', 'SteelSeries', 'Corsair', 'HyperX', 'Turtle Beach', 'Astro', 'Scuf'] 
      },
    ],
  },
  {
    name: 'books',
    icon: MdOutlineBook,
    types: [
      { 
        type: 'Books', 
        brands: ['Penguin', 'HarperCollins', 'Simon & Schuster', 'Macmillan', 'Hachette', 'Scholastic', 'Random House', 'Oxford'] 
      },
      { 
        type: 'Educational', 
        brands: ['Pearson', 'McGraw-Hill', 'Cengage', 'Wiley', 'Cambridge', 'Oxford', 'Elsevier', 'Springer'] 
      },
      { 
        type: 'Music & Movies', 
        brands: ['Sony', 'Universal', 'Warner', 'Disney', 'Paramount', 'Netflix', 'Amazon', 'Apple'] 
      },
    ],
  },
  {
    name: 'sports',
    icon: MdOutlineSportsSoccer,
    types: [
      { 
        type: 'Fitness Equipment', 
        brands: ['Peloton', 'NordicTrack', 'Bowflex', 'Schwinn', 'Life Fitness', 'Precor', 'Nautilus', 'ProForm'] 
      },
      { 
        type: 'Sportswear', 
        brands: ['Nike', 'Adidas', 'Under Armour', 'Puma', 'Reebok', 'New Balance', 'Lululemon', 'Athleta'] 
      },
      { 
        type: 'Outdoor Sports', 
        brands: ['Patagonia', 'The North Face', 'Columbia', 'REI', 'Salomon', 'Merrell', 'Garmin', 'GoPro'] 
      },
    ],
  },
  {
    name: 'automotive',
    icon: MdOutlineDirectionsCar,
    types: [
      { 
        type: 'Auto Parts', 
        brands: ['Bosch', 'Denso', 'ACDelco', 'Motorcraft', 'NGK', 'Champion', 'Fram', 'Mobil 1'] 
      },
      { 
        type: 'Car Accessories', 
        brands: ['Thule', 'Yakima', 'WeatherTech', 'Covercraft', 'Husky Liners', 'AVS', 'Bushwacker', 'Rough Country'] 
      },
      { 
        type: 'Oils & Fluids', 
        brands: ['Mobil 1', 'Castrol', 'Valvoline', 'Shell', 'Pennzoil', 'Royal Purple', 'Lucas Oil', 'Liqui Moly'] 
      },
    ],
  },
  {
    name: 'beauty',
    icon: MdOutlineFace,
    types: [
      { 
        type: 'Skincare', 
        brands: ['Cetaphil', 'Neutrogena', 'Olay', "L'Oréal", 'Clinique', 'The Ordinary', 'CeraVe', 'Aveeno'] 
      },
      { 
        type: 'Makeup', 
        brands: ['MAC', 'Sephora', 'Urban Decay', 'Too Faced', 'NARS', 'Charlotte Tilbury', 'Fenty Beauty', 'Rare Beauty'] 
      },
      { 
        type: 'Personal Care', 
        brands: ['Johnson & Johnson', 'P&G', 'Unilever', 'Colgate', 'Oral-B', 'Gillette', 'Dove', 'Nivea'] 
      },
    ],
  },
];



export const FILTER_CATEGORIES = [
  'All Categories',
  'Electronics',
  'Fashion',
  'Home & Living',
  'Sports & Fitness',
];
export const STOCK_STATUS_OPTIONS = ['All Status', 'active', 'low_stock', 'out_of_stock'];
