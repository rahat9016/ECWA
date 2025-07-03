import { CarTaxiFront, Heart, Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-gray-600 text-white h-24 flex items-center justify-center'>
      <div className='lg:container border-2 border-white w-full flex items-center justify-between gap-20'>
        <Image src={'/logo.png'} alt='logo' height={120} width={160} />
        <div className='w-full bg-white flex items-center px-4 rounded-lg'>
          <input placeholder='Search' className='h-12 text-gray-800 pr-4 w-full outline-none' />          
            <Search size={28} color='gray' />          
        </div>
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 text-xs font-semibold flex justify-center items-center rounded-full bg-red-500'>
              <p>3</p>
            </div>
            <Heart size={28} />
            <p className='whitespace-nowrap'>Wish List</p>
          </div>
          <div>
            Cart 
          </div>
          <div>
            Registration/Login
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar