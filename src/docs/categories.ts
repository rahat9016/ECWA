
import { MdOutlinePhoneAndroid, MdOutlineSportsSoccer, MdOutlineDirectionsCar, MdOutlineHome, MdOutlineBook, MdOutlineFace } from 'react-icons/md';


export const CATEGORIES = [
  {
    name: 'electronics',
    icon: MdOutlinePhoneAndroid,
    subCategories: [
      { 
        name: 'Smartphones', 
        brands: ['Samsung', 'Apple', 'Xiaomi', 'OnePlus', 'Google', 'Huawei', 'Oppo', 'Vivo'] 
      },
      { 
        name: 'Laptops & Computers', 
        brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Microsoft'] 
      },
      { 
        name: 'Audio & Headphones', 
        brands: ['Sony', 'Bose', 'Apple', 'Sennheiser', 'JBL', 'Beats', 'Audio-Technica', 'Skullcandy'] 
      },
      { 
        name: 'Cameras & Photography', 
        brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'Olympus', 'GoPro', 'DJI'] 
      },
      { 
        name: 'Smartwatches & Wearables', 
        brands: ['Apple', 'Samsung', 'Fitbit', 'Garmin', 'Fossil', 'Amazfit', 'Polar', 'Suunto'] 
      },
    ],
  },
  {
    name: 'fashion',
    icon: MdOutlineFace,
    subCategories: [
      { 
        name: "Men's Clothing", 
        brands: ['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', 'Ralph Lauren', 'Tommy Hilfiger', 'Calvin Klein'] 
      },
      { 
        name: "Women's Clothing", 
        brands: ['Zara', 'H&M', 'Forever 21', 'Mango', 'Uniqlo', "Victoria's Secret", 'Gap', "Levi's"] 
      },
      { 
        name: 'Shoes & Footwear', 
        brands: ['Nike', 'Adidas', 'Puma', 'Converse', 'Vans', 'New Balance', 'Reebok', 'Under Armour'] 
      },
      { 
        name: 'Accessories', 
        brands: ['Michael Kors', 'Coach', 'Kate Spade', 'Fossil', 'Ray-Ban', 'Oakley', 'Gucci', 'Prada'] 
      },
    ],
  },
  {
    name: 'home',
    icon: MdOutlineHome,
    subCategories: [
      { 
        name: 'Furniture', 
        brands: ['IKEA', 'Ashley', 'Wayfair', 'West Elm', 'CB2', 'Pottery Barn', 'Crate & Barrel', 'Room & Board'] 
      },
      { 
        name: 'Lighting', 
        brands: ['Philips', 'IKEA', 'West Elm', 'CB2', 'Artemide', 'Flos', 'Tom Dixon', 'Muuto'] 
      },
      { 
        name: 'Kitchen & Dining', 
        brands: ['KitchenAid', 'Cuisinart', 'Ninja', 'Instant Pot', 'Breville', 'All-Clad', 'Le Creuset', 'OXO'] 
      },
      { 
        name: 'Home Decor', 
        brands: ['West Elm', 'CB2', 'Pottery Barn', 'Anthropologie', 'Urban Outfitters', 'Target', 'HomeGoods', 'Wayfair'] 
      },
    ],
  },
  {
    name: 'gaming',
    icon: MdOutlineSportsSoccer,
    subCategories: [
      { 
        name: 'Gaming Consoles', 
        brands: ['Sony', 'Microsoft', 'Nintendo', 'Steam', 'Valve', 'Atari', 'Sega', 'Retro-Bit'] 
      },
      { 
        name: 'PC Gaming', 
        brands: ['NVIDIA', 'AMD', 'Intel', 'Corsair', 'Razer', 'Logitech', 'SteelSeries', 'ASUS'] 
      },
      { 
        name: 'Gaming Accessories', 
        brands: ['Razer', 'Logitech', 'SteelSeries', 'Corsair', 'HyperX', 'Turtle Beach', 'Astro', 'Scuf'] 
      },
    ],
  },
  {
    name: 'books',
    icon: MdOutlineBook,
    subCategories: [
      { 
        name: 'Books', 
        brands: ['Penguin', 'HarperCollins', 'Simon & Schuster', 'Macmillan', 'Hachette', 'Scholastic', 'Random House', 'Oxford'] 
      },
      { 
        name: 'Educational', 
        brands: ['Pearson', 'McGraw-Hill', 'Cengage', 'Wiley', 'Cambridge', 'Oxford', 'Elsevier', 'Springer'] 
      },
      { 
        name: 'Music & Movies', 
        brands: ['Sony', 'Universal', 'Warner', 'Disney', 'Paramount', 'Netflix', 'Amazon', 'Apple'] 
      },
    ],
  },
  {
    name: 'sports',
    icon: MdOutlineSportsSoccer,
    subCategories: [
      { 
        name: 'Fitness Equipment', 
        brands: ['Peloton', 'NordicTrack', 'Bowflex', 'Schwinn', 'Life Fitness', 'Precor', 'Nautilus', 'ProForm'] 
      },
      { 
        name: 'Sportswear', 
        brands: ['Nike', 'Adidas', 'Under Armour', 'Puma', 'Reebok', 'New Balance', 'Lululemon', 'Athleta'] 
      },
      { 
        name: 'Outdoor Sports', 
        brands: ['Patagonia', 'The North Face', 'Columbia', 'REI', 'Salomon', 'Merrell', 'Garmin', 'GoPro'] 
      },
    ],
  },
  {
    name: 'automotive',
    icon: MdOutlineDirectionsCar,
    subCategories: [
      { 
        name: 'Auto Parts', 
        brands: ['Bosch', 'Denso', 'ACDelco', 'Motorcraft', 'NGK', 'Champion', 'Fram', 'Mobil 1'] 
      },
      { 
        name: 'Car Accessories', 
        brands: ['Thule', 'Yakima', 'WeatherTech', 'Covercraft', 'Husky Liners', 'AVS', 'Bushwacker', 'Rough Country'] 
      },
      { 
        name: 'Oils & Fluids', 
        brands: ['Mobil 1', 'Castrol', 'Valvoline', 'Shell', 'Pennzoil', 'Royal Purple', 'Lucas Oil', 'Liqui Moly'] 
      },
    ],
  },
  {
    name: 'beauty',
    icon: MdOutlineFace,
    subCategories: [
      { 
        name: 'Skincare', 
        brands: ['Cetaphil', 'Neutrogena', 'Olay', "L'Oréal", 'Clinique', 'The Ordinary', 'CeraVe', 'Aveeno'] 
      },
      { 
        name: 'Makeup', 
        brands: ['MAC', 'Sephora', 'Urban Decay', 'Too Faced', 'NARS', 'Charlotte Tilbury', 'Fenty Beauty', 'Rare Beauty'] 
      },
      { 
        name: 'Personal Care', 
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
