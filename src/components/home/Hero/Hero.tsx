

import Carousel from './Carousel';
import Sidebar from '@/components/shared/Navbar/MobileNav/Sidebar';


const Hero = () => {
  const imagesMain = [
    "/hero/hero1/1.png",
    "/hero/hero1/2.png",
    "/hero/hero1/3.png",
    "/hero/hero1/4.png",
  ];

  const imagesSubLeft = [
    "/hero/hero2/1.png",
    "/hero/hero2/2.png",
  ];

  const imagesSubRight = [
    "/hero/hero3/1.png",
    "/hero/hero3/2.png",
    "/hero/hero3/3.png",
  ];

  return (
    <section className="py-5 lg:py-20 bg-gradient-to-r from-[#90e0ef]/20 via-white to-[#56cfe1]/20">
      <div className="container relative mx-auto px-4">
        <div className="absolute hidden lg:block bg-[#e0f5f2] backdrop-blur-2xl w-80 my-5 px-2 py-5 top-0 bottom-0 overflow-auto">
          <Sidebar mobile={false} className="static w-full" />
        </div>
        <div className="w-full pl:0  lg:pl-80">
          <div className='py-5 px-0 lg:px-3 flex flex-col gap-5'>
            <div className='bg-white w-full rounded-xl'>
              <Carousel height={'h-[300px] md:h-[400px] lg:h-[500px]'} delay={5000} images={imagesMain} />
            </div>
            <div className='grid grid-cols-2 gap-5 w-full'>
              <div className='h-full'>
                <Carousel height={"h-40"} delay={4500} images={imagesSubLeft} />
              </div>
              <div className='h-full'>
                <Carousel height={"h-40"} delay={4000} slideDirection='left' images={imagesSubRight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;